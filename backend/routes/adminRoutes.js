const express = require("express");

const router = express.Router();

const {
    authenticateToken,
    authorize
} = require("../middleWare/auth");

const {
    createStudent,
    createFaculty,
    adminEnroll,
    adminRemoveEnrollment
} = require("../controllers/adminController");


router.post(
    "/students",
    authenticateToken,
    authorize("admin"),
    createStudent
);

router.post(
    "/faculty",
    authenticateToken,
    authorize("admin"),
    createFaculty
);

router.post(
    "/enrollments",
    authenticateToken,
    authorize("admin"),
    adminEnroll
);


// Admin removes enrollment
router.delete(
    "/enrollments/:studentId/:courseId",
    authenticateToken,
    authorize("admin"),
    adminRemoveEnrollment
);


module.exports = router;