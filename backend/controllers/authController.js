const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db");

const loginSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(6)
});


// LOGIN
async function login(req, res) {

    try {

        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }

        const { login, password } = result.data;

        const userResult = await pool.query(
            `SELECT id, name AS username, email, password AS password_hash, role
             FROM users
             WHERE email = $1 OR name = $1`,
            [login]
        );

        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
}


// GET CURRENT USER
async function getMe(req, res) {

    try {

        const user = await pool.query(
            `SELECT id, name AS username, email, role
             FROM users
             WHERE id = $1`,
            [req.user.id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
}


module.exports = {
    login,
    getMe
};
