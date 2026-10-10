const express = require("express");

const router = express.Router();

const {
    authenticateToken,
    authorize
} = require("../middleWare/auth");

const {
    getMyCourses
} = require("../controllers/facultyController");


router.get(
    "/courses",
    authenticateToken,
    authorize("faculty"),
    getMyCourses
);


module.exports = router;