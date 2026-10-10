const express = require("express");

const router = express.Router();

const {
    authenticateToken,
    authorize
} = require("../middleWare/auth");

const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    getCourseById
} = require("../controllers/courseController");


// CREATE
router.post(
    "/create",
    authenticateToken,
    authorize("admin"),
    createCourse
);


// GET ALL
router.get(
    "/",
    authenticateToken,
    getCourses
);


// GET ONE
router.get(
    "/:id",
    authenticateToken,
    getCourseById
);


// UPDATE
router.put(
    "/:id",
    authenticateToken,
    authorize("admin"),
    updateCourse
);


// DELETE
router.delete(
    "/:id",
    authenticateToken,
    authorize("admin"),
    deleteCourse
);


module.exports = router;