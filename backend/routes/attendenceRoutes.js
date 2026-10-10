const express = require("express");

const router = express.Router();

const {
    authenticateToken,
    authorize
} = require("../middleWare/auth");

const {
    markCourseAttendance,
    getMyAttendance,
    getStudentAttendance,
    getCourseAttendance
} = require("../controllers/attendanceController");


router.post(
    "/",
    authenticateToken,
    authorize("faculty"),
    markCourseAttendance
);

router.get(
    "/",
    authenticateToken,
    authorize("student"),
    getMyAttendance
);
router.get(
    "/course/:courseId",
    authenticateToken,
    authorize("faculty"),
    getCourseAttendance
);

// Faculty views a particular student's attendance
router.get(
    "/:courseId/:studentId",
    authenticateToken,
    authorize("faculty"),
    getStudentAttendance
);

module.exports = router;
