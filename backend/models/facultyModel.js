const pool = require("../db");

const createFaculty = async ({
    username,
    email,
    passwordHash,
    employee_id,
    department,
    designation
}) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        // Create login account
        const userResult = await client.query(
            `INSERT INTO users
             (name, email, password, role)
             VALUES ($1, $2, $3, 'faculty')
             RETURNING id, name AS username, email, role`,
            [
                username,
                email,
                passwordHash
            ]
        );

        const user = userResult.rows[0];


        // Create faculty profile
        const facultyResult = await client.query(
            `INSERT INTO faculty
             (user_id, employee_id, department, designation)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                user.id,
                employee_id,
                department,
                designation
            ]
        );


        await client.query("COMMIT");


        return {
            user,
            faculty: facultyResult.rows[0]
        };

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }
};


module.exports = {
    createFaculty
};
