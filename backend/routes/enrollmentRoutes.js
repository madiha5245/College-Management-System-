const express = require("express");

const router = express.Router();

const auth = require("../middleWare/auth");

const {
    enroll,
    getMyEnrollments,
    unenroll
} = require("../controllers/enrollmentController");


// Enroll in a course
router.post(
    "/:courseId",
    auth.authenticateToken,
    auth.authorize("student"),
    enroll
);


// Get my courses
router.get(
    "/my",
    auth.authenticateToken,
    auth.authorize("student"),
    getMyEnrollments
);

// Unenroll from a course
router.delete(
    "/:courseId",
    auth.authenticateToken,
    auth.authorize("student"),
    unenroll
);



module.exports = router;
