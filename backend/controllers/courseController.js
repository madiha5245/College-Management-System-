const z = require("zod");

const {
    findFacultyById,
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../models/courseModel");

const courseSchema = z.object({
    course_code: z.string().min(2).max(20),
    course_name: z.string().min(2).max(100),
    description: z.string().optional(),
    faculty_id: z.number().int().positive()
});

const getCourses = async (req, res, next) => {

    try {

        const courses = await getAllCourses();

        res.status(200).json({
            courses
        });

    } catch (error) {

        next(error);

    }
};

const createCourseController = async (req, res, next) => {

    try {

        // 1. Validate request body
        const result = courseSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }


        // 2. Get validated data
        const {
            course_code,
            course_name,
            description,
            faculty_id
        } = result.data;


        // 3. Check faculty
        const faculty = await findFacultyById(faculty_id);

        if (!faculty) {
            return res.status(400).json({
                message: "Invalid faculty"
            });
        }


        // 4. Create course
        const course = await createCourse(
            course_code,
            course_name,
            description || null,
            faculty_id
        );


        // 5. Send response
        return res.status(201).json({
            message: "Course created successfully",
            course: course
        });

    } catch (error) {

        next(error);

    }
};

const getCourseByIdd = async (req, res, next) => {

    try {

        const courseId = Number(req.params.id);

        if (!Number.isInteger(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await getCourseById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            course
        });

    } catch (error) {

        next(error);

    }
};

const updateCourseController = async (req, res, next) => {

    try {

        const courseId = Number(req.params.id);

        if (!Number.isInteger(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }


        // Validate request body
        const result = courseSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues
            });
        }


        const {
            course_code,
            course_name,
            description,
            faculty_id
        } = result.data;


        // Check faculty exists
        const faculty = await findFacultyById(faculty_id);

        if (!faculty) {
            return res.status(400).json({
                message: "Invalid faculty"
            });
        }


        // Update course
        const course = await updateCourse(
            courseId,
            course_code,
            course_name,
            description || null,
            faculty_id
        );


        // Course doesn't exist
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }


        return res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (error) {

        next(error);

    }
};

const deleteCourseController = async (req, res, next) => {

    try {

        const courseId = Number(req.params.id);

        if (!Number.isInteger(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }


        const course = await deleteCourse(courseId);


        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }


        return res.status(200).json({
            message: "Course deleted successfully",
            course
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {
    createCourse: createCourseController,
    getCourses,
    getCourseById: getCourseByIdd,
    updateCourse: updateCourseController,
    deleteCourse: deleteCourseController
};