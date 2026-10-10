const path = require("node:path");
const readline = require("node:readline");
const { StringDecoder } = require("node:string_decoder");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config({
    path: path.resolve(__dirname, "..", ".env"),
    quiet: true
});

function ask(question) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.once("SIGINT", () => {
            rl.close();
            reject(new Error("Input cancelled."));
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

function askPassword() {
    const input = process.stdin;

    if (!input.isTTY || typeof input.setRawMode !== "function") {
        return Promise.reject(
            new Error("Run this script in an interactive terminal to enter the password safely.")
        );
    }

    return new Promise((resolve, reject) => {
        const decoder = new StringDecoder("utf8");
        let password = "";
        let finished = false;

        const cleanup = () => {
            input.removeListener("data", onData);
            input.setRawMode(false);
            input.pause();
            process.stdout.write("\n");
        };

        const finish = (callback, value) => {
            if (finished) return;
            finished = true;
            cleanup();
            callback(value);
        };

        const onData = (chunk) => {
            for (const character of decoder.write(chunk)) {
                if (character === "\u0003" || character === "\u0004") {
                    finish(reject, new Error("Input cancelled."));
                    return;
                }

                if (character === "\r" || character === "\n") {
                    finish(resolve, password);
                    return;
                }

                if (character === "\u0008" || character === "\u007f") {
                    password = Array.from(password).slice(0, -1).join("");
                } else if (character >= " ") {
                    password += character;
                }
            }
        };

        process.stdout.write("Admin password (input hidden): ");
        input.setRawMode(true);
        input.resume();
        input.on("data", onData);
    });
}

async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is missing from backend/.env.");
    }

    const username = await ask("Admin username: ");
    const email = await ask("Admin email: ");
    const password = await askPassword();

    if (!username) throw new Error("Username cannot be empty.");
    if (!email) throw new Error("Email cannot be empty.");
    if (!password) throw new Error("Password cannot be empty.");

    const pool = require("../db");

    try {
        const client = await pool.connect();
        let transactionStarted = false;

        try {
            await client.query("BEGIN");
            transactionStarted = true;

            // Serialize bootstrap attempts so two simultaneous runs cannot both pass the empty-table check.
            await client.query("LOCK TABLE users IN EXCLUSIVE MODE");

            const existingUsers = await client.query(
                "SELECT EXISTS (SELECT 1 FROM users) AS has_users"
            );

            if (existingUsers.rows[0].has_users) {
                throw new Error(
                    "The users table is not empty. This bootstrap script only initializes an empty database."
                );
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const result = await client.query(
                `INSERT INTO users (name, email, password, role)
                 VALUES ($1, $2, $3, 'admin')
                 RETURNING id, name, email, role;`,
                [username, email, passwordHash]
            );

            await client.query("COMMIT");
            transactionStarted = false;

            const admin = result.rows[0];
            console.log("First admin created successfully:");
            console.log(`ID: ${admin.id}`);
            console.log(`Username: ${admin.name}`);
            console.log(`Email: ${admin.email}`);
            console.log(`Role: ${admin.role}`);
        } catch (error) {
            if (transactionStarted) {
                await client.query("ROLLBACK");
            }
            throw error;
        } finally {
            client.release();
        }
    } finally {
        await pool.end();
    }
}

main().catch((error) => {
    console.error(`Admin bootstrap failed: ${error.message}`);
    process.exitCode = 1;
});
