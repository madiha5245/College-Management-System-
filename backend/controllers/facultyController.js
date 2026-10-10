const pool = require("../db");

const getMyCourses = async (req, res, next) => {

    try {

        const facultyId = req.user.id;

        const result = await pool.query(
            `SELECT id,
                    course_code,
                    course_name,
                    description
             FROM courses
             WHERE faculty_id = $1
             ORDER BY course_code`,
            [facultyId]
        );

        res.status(200).json({
            courses: result.rows
        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    getMyCourses
};