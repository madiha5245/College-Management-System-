const z = require("zod");

const pool = require("../db");

const {
    markAttendance,
    getStudentAttendance,
    getAttendanceByStudentAndCourse,
    getCourseAttendanceSummary
} = require("../models/attendanceModel");

const attendanceSchema = z.object({

    course_id: z.number()
        .int()
        .positive(),

    attendance_date: z.string(),

    attendance: z.array(
        z.object({
            student_id: z.number()
                .int()
                .positive(),

            status: z.enum([
                "present",
                "absent"
            ])
        })
    ).min(1)
});

const markCourseAttendance = async (req, res, next) => {

    try {

        // 1. Validate request

        const result = attendanceSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }


        const {
            course_id,
            attendance_date,
            attendance
        } = result.data;


        // 2. Logged-in faculty

        const facultyId = req.user.id;


        // 3. Check faculty owns this course

        const courseResult = await pool.query(
            `SELECT id
             FROM courses
             WHERE id = $1
             AND faculty_id = $2`,
            [
                course_id,
                facultyId
            ]
        );


        if (courseResult.rows.length === 0) {

            return res.status(403).json({
                message: "You are not assigned to this course"
            });

        }


        // 4. Get enrolled students

        const enrolledResult = await pool.query(
            `SELECT student_id
             FROM enrollments
             WHERE course_id = $1`,
            [course_id]
        );


        const enrolledStudents =
            new Set(
                enrolledResult.rows.map(
                    row => row.student_id
                )
            );


        // 5. Verify every student is enrolled

        for (const record of attendance) {

            if (!enrolledStudents.has(record.student_id)) {

                return res.status(400).json({
                    message:
                        `Student ${record.student_id} is not enrolled in this course`
                });

            }

        }

        

        for (const studentId of enrolledStudents) {

            const submitted = attendance.some(
                record => record.student_id === studentId
            );

            if (!submitted) {

                return res.status(400).json({
                    message:`Attendance missing for student ${studentId}`
                });

            }
        }


        // 6. Save attendance

        const records = await markAttendance(
            course_id,
            attendance_date,
            attendance
        );


        return res.status(201).json({

            message: "Attendance marked successfully",

            records

        });

    } catch (error) {

        // Duplicate attendance for same day

        if (error.code === "23505") {

            return res.status(409).json({
                message:
                    "Attendance already exists for one or more students"
            });

        }

        next(error);

    }
};

const getCourseAttendance = async (req, res, next) => {

    try {

        const courseId = Number(req.params.courseId);

        const facultyId = req.user.id;

        if (!Number.isInteger(courseId) || courseId <= 0) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const courseResult = await pool.query(
            `SELECT id
             FROM courses
             WHERE id = $1
             AND faculty_id = $2`,
            [courseId, facultyId]
        );

        if (courseResult.rows.length === 0) {
            return res.status(403).json({
                message: "You are not assigned to this course"
            });
        }


        const attendance = await getCourseAttendanceSummary(courseId);

        return res.status(200).json({
            course_id: courseId,
            students: attendance
        });

    } catch (error) {

        next(error);

    }
};

const getMyAttendance = async (req, res, next) => {

    try {

        // Get student ID from JWT
        const studentId = req.user.id;

        const attendance =
            await getStudentAttendance(studentId);

        return res.status(200).json({
            attendance
        });

    } catch (error) {

        next(error);

    }
};

const GetStudentAttendance = async (req, res, next) => {

    try {

        const facultyId = req.user.id;
        const courseId = Number(req.params.courseId);
        const studentId = Number(req.params.studentId);

        const isValidId = (value, rawValue) =>
            /^\d+$/.test(rawValue) &&
            Number.isSafeInteger(value) &&
            value > 0 &&
            value <= 2147483647;

        if (!isValidId(courseId, req.params.courseId) ||
            !isValidId(studentId, req.params.studentId)) {
            return res.status(400).json({
                message: "Invalid course ID or student ID"
            });
        }


        // 1. Check that this faculty teaches this course

        const courseResult = await pool.query(
            `SELECT id
             FROM courses
             WHERE id = $1
             AND faculty_id = $2`,
            [courseId, facultyId]
        );

        if (courseResult.rows.length === 0) {
            return res.status(403).json({
                message: "You are not assigned to this course"
            });
        }


        // 2. Check that student is enrolled in this course

        const enrollmentResult = await pool.query(
            `SELECT id
             FROM enrollments
             WHERE student_id = $1
             AND course_id = $2`,
            [studentId, courseId]
        );

        if (enrollmentResult.rows.length === 0) {
            return res.status(404).json({
                message: "Student is not enrolled in this course"
            });
        }


        // 3. Get attendance

        const attendance = await getAttendanceByStudentAndCourse(
            studentId,
            courseId
        );


        return res.status(200).json({
            attendance
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    markCourseAttendance,
    getMyAttendance,
    getStudentAttendance: GetStudentAttendance,
    getCourseAttendance
};
