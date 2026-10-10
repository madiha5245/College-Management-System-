const z = require("zod");
const bcrypt = require("bcrypt");
const pool = require("../db");

const {
    createStudent
} = require("../models/studentModel");

const {
    createFaculty: createFacultyModel
} = require("../models/facultyModel");

const {
    enrollStudent,
    removeEnrollment
} = require("../models/enrollmentModel");

const studentSchema = z.object({

    username: z.string()
        .min(3, "Username must be at least 3 characters long"),

    email: z.string()
        .email("Invalid email address"),

    password: z.string()
        .min(6, "Password must be at least 6 characters long"),

    roll_no: z.string()
        .min(2, "Roll number is required"),

    department: z.string()
        .min(2, "Department is required"),

    year: z.number()
        .int()
        .min(1)
        .max(5),

    section: z.string()
        .min(1)
        .max(10)
});

const facultySchema = z.object({

    username: z.string()
        .min(3, "Username must be at least 3 characters long"),

    email: z.string()
        .email("Invalid email address"),

    password: z.string()
        .min(6, "Password must be at least 6 characters long"),

    employee_id: z.string()
        .min(2, "Employee ID is required"),

    department: z.string()
        .min(2, "Department is required"),

    designation: z.string()
        .min(2, "Designation is required")
});

const CreateStudent = async (req, res, next) => {

    try {

        // 1. Validate request
        const result = studentSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }


        const {
            username,
            email,
            password,
            roll_no,
            department,
            year,
            section
        } = result.data;


        // 2. Hash password
        const passwordHash = await bcrypt.hash(password, 10);


        // 3. Create user + student
        const resultStudent = await createStudent({
            username,
            email,
            passwordHash,
            roll_no,
            department,
            year,
            section
        });


        // 4. Send response
        return res.status(201).json({
            message: "Student created successfully",
            student: resultStudent
        });

    } catch (error) {

        // PostgreSQL unique violation
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Username, email, or roll number already exists"
            });
        }

        next(error);
    }
};

const createFaculty = async (req, res, next) => {

    try {

        const result = facultySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }


        const {
            username,
            email,
            password,
            employee_id,
            department,
            designation
        } = result.data;


        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);


        // Create user + faculty profile
        const faculty = await createFacultyModel({
            username,
            email,
            passwordHash,
            employee_id,
            department,
            designation
        });


        return res.status(201).json({
            message: "Faculty created successfully",
            faculty
        });

    } catch (error) {

        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Username, email, or employee ID already exists"
            });
        }

        next(error);
    }
};

const adminEnroll = async (req, res, next) => {

    try {

        const parseId = (value) => {
            if (typeof value !== "number" &&
                !(typeof value === "string" && /^\d+$/.test(value))) {
                return null;
            }

            const id = Number(value);
            return Number.isSafeInteger(id) && id > 0 && id <= 2147483647
                ? id
                : null;
        };

        const studentId = parseId(req.body?.student_id);
        const courseId = parseId(req.body?.course_id);

        if (
            studentId === null ||
            courseId === null
        ) {
            return res.status(400).json({
                message: "Invalid student ID or course ID"
            });
        }


        // Check student exists
        const studentResult = await pool.query(
            `SELECT user_id
             FROM students
             WHERE user_id = $1`,
            [studentId]
        );

        if (studentResult.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
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
            message: "Student enrolled successfully",
            enrollment
        });

    } catch (error) {

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Student is already enrolled in this course"
            });
        }

        next(error);
    }
};

const adminRemoveEnrollment = async (req, res, next) => {

    try {

        const studentId = Number(req.params.studentId);
        const courseId = Number(req.params.courseId);


        if (
            !Number.isInteger(studentId) ||
            !Number.isInteger(courseId)
        ) {
            return res.status(400).json({
                message: "Invalid student ID or course ID"
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
            message: "Student removed from course successfully"
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    createStudent: CreateStudent,
    createFaculty: createFaculty,
    adminEnroll: adminEnroll,
    adminRemoveEnrollment: adminRemoveEnrollment
};
