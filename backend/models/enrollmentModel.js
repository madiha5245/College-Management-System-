const pool = require("../db");


const enrollStudent = async (studentId, courseId) => {

    const result = await pool.query(
        `INSERT INTO enrollments
         (student_id, course_id)
         VALUES ($1, $2)
         RETURNING *`,
        [
            studentId,
            courseId
        ]
    );

    return result.rows[0];
};


const getStudentEnrollments = async (studentId) => {

    const result = await pool.query(
        `SELECT
            e.id,
            e.enrolled_at,
            c.id AS course_id,
            c.course_code,
            c.course_name,
            c.description,
            c.faculty_id
         FROM enrollments e
         JOIN courses c
           ON e.course_id = c.id
         WHERE e.student_id = $1
         ORDER BY e.enrolled_at DESC`,
        [studentId]
    );

    return result.rows;
};


const removeEnrollment = async (studentId, courseId) => {

    const result = await pool.query(
        `DELETE FROM enrollments
         WHERE student_id = $1
         AND course_id = $2
         RETURNING *`,
        [
            studentId,
            courseId
        ]
    );

    return result.rows[0];
};


module.exports = {
    enrollStudent,
    getStudentEnrollments,
    removeEnrollment
};