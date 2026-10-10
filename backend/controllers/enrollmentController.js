const {
    enrollStudent,
    getStudentEnrollments,
    removeEnrollment
} = require("../models/enrollmentModel");

const pool = require("../db");

const enroll = async (req, res, next) => {

    try {

        const studentId = req.user.id;
        const courseId = Number(req.params.courseId);


        if (!Number.isInteger(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }


        // Check that the logged-in user is actually a student
        const studentResult = await pool.query(
            `SELECT user_id
             FROM students
             WHERE user_id = $1`,
            [studentId]
        );

        if (studentResult.rows.length === 0) {
            return res.status(403).json({
                message: "Only students can enroll in courses"
            });
        }


        // Check course exists
        const courseResult = await pool.query(
            `SELECT id
             FROM courses
             WHERE id = $1`,
            [courseId]
        );

        if (courseResult.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }


        const enrollment = await enrollStudent(
            studentId,
            courseId
        );


        return res.status(201).json({
            message: "Course enrolled successfully",
            enrollment
        });

    } catch (error) {

        // Duplicate enrollment
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Student is already enrolled in this course"
            });
        }

        next(error);
    }
};

const getMyEnrollments = async (req, res, next) => {

    try {

        const studentId = req.user.id;

        const enrollments =
            await getStudentEnrollments(studentId);

        return res.status(200).json({
            enrollments
        });

    } catch (error) {

        next(error);

    }
};

const unenroll = async (req, res, next) => {

    try {

        const studentId = req.user.id;
        const rawCourseId = req.params.courseId;
        const courseId = Number(rawCourseId);


        if (
            !/^\d+$/.test(rawCourseId) ||
            !Number.isSafeInteger(courseId) ||
            courseId <= 0 ||
            courseId > 2147483647
        ) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }


        const enrollment = await removeEnrollment(
            studentId,
            courseId
        );


        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }


        return res.status(200).json({
            message: "Course unenrolled successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    enroll,
    getMyEnrollments,
    unenroll
};
