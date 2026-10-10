const pool = require("../db");

const createStudent = async ({
    username,
    email,
    passwordHash,
    roll_no,
    department,
    year,
    section
}) => {

    const client = await pool.connect();

    try {

        // Start transaction
        await client.query("BEGIN");


        // 1. Create user
        const userResult = await client.query(
            `INSERT INTO users
             (name, email, password, role)
             VALUES ($1, $2, $3, 'student')
             RETURNING id, name AS username, email, role`,
            [
                username,
                email,
                passwordHash
            ]
        );

        const user = userResult.rows[0];


        // 2. Create student profile
        const studentResult = await client.query(
            `INSERT INTO students
             (user_id, roll_no, department, year, section)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                user.id,
                roll_no,
                department,
                year,
                section
            ]
        );


        // Everything succeeded
        await client.query("COMMIT");


        return {
            user,
            student: studentResult.rows[0]
        };

    } catch (error) {

        // Something failed → undo everything
        await client.query("ROLLBACK");

        throw error;

    } finally {

        // Return connection to pool
        client.release();

    }
};


module.exports = {
    createStudent
};
