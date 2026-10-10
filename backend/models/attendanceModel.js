const pool = require("../db");


const markAttendance = async (
    courseId,
    attendanceDate,
    attendance
) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const insertedRecords = [];

        for (const record of attendance) {

            const result = await client.query(
                `INSERT INTO attendance
                (student_id, course_id, attendance_date, status)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
                [
                    record.student_id,
                    courseId,
                    attendanceDate,
                    record.status
                ]
            );

            insertedRecords.push(result.rows[0]);
        }

        await client.query("COMMIT");

        return insertedRecords;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }
};

const getStudentAttendance = async (studentId) => {

    const result = await pool.query(
        `SELECT
            a.id,
            a.attendance_date,
            a.status,
            c.id AS course_id,
            c.course_code,
            c.course_name
         FROM attendance a
         JOIN courses c
           ON a.course_id = c.id
         WHERE a.student_id = $1
         ORDER BY a.attendance_date DESC`,
        [studentId]
    );

    return result.rows;
};

const getCourseAttendanceSummary = async (courseId) => {

    const result = await pool.query(
        `
        SELECT
            s.user_id AS student_id,
            u.name AS username,

            COUNT(a.id) AS total_classes,

            COUNT(a.id) FILTER (
                WHERE a.status = 'present'
            ) AS total_present

        FROM enrollments e

        JOIN students s
            ON e.student_id = s.user_id

        JOIN users u
            ON s.user_id = u.id

        LEFT JOIN attendance a
            ON a.student_id = e.student_id
            AND a.course_id = e.course_id

        WHERE e.course_id = $1

        GROUP BY
            s.user_id,
            u.name

        ORDER BY u.name;
        `,
        [courseId]
    );

    return result.rows;
};

const getAttendanceByStudentAndCourse = async (
    studentId,
    courseId
) => {

    const result = await pool.query(
        `SELECT
            id,
            attendance_date,
            status
         FROM attendance
         WHERE student_id = $1
         AND course_id = $2
         ORDER BY attendance_date DESC`,
        [studentId, courseId]
    );

    return result.rows;
};

module.exports = {
    markAttendance,
    getStudentAttendance,
    getAttendanceByStudentAndCourse,
    getCourseAttendanceSummary
};
