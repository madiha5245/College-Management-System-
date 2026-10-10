const pool = require("../db");


// Check faculty
const findFacultyById = async (facultyId) => {

    const result = await pool.query(
        `SELECT id
         FROM users
         WHERE id = $1
         AND role = 'faculty'`,
        [facultyId]
    );

    return result.rows[0];
};


// CREATE
const createCourse = async (
    course_code,
    course_name,
    description,
    faculty_id
) => {

    const result = await pool.query(
        `INSERT INTO courses
         (course_code, course_name, description, faculty_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
            course_code,
            course_name,
            description,
            faculty_id
        ]
    );

    return result.rows[0];
};


// GET ALL
const getAllCourses = async () => {

    const result = await pool.query(
        `SELECT *
         FROM courses
         ORDER BY course_code`
    );

    return result.rows;
};


// GET ONE
const getCourseById = async (courseId) => {

    const result = await pool.query(
        `SELECT *
         FROM courses
         WHERE id = $1`,
        [courseId]
    );

    return result.rows[0];
};


// UPDATE
const updateCourse = async (
    courseId,
    course_code,
    course_name,
    description,
    faculty_id
) => {

    const result = await pool.query(
        `UPDATE courses
         SET course_code = $1,
             course_name = $2,
             description = $3,
             faculty_id = $4
         WHERE id = $5
         RETURNING *`,
        [
            course_code,
            course_name,
            description,
            faculty_id,
            courseId
        ]
    );

    return result.rows[0];
};


// DELETE
const deleteCourse = async (courseId) => {

    const result = await pool.query(
        `DELETE FROM courses
         WHERE id = $1
         RETURNING *`,
        [courseId]
    );

    return result.rows[0];
};


module.exports = {
    findFacultyById,
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};