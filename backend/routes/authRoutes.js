const express = require("express");

const router = express.Router();

const {
    login,
    getMe
} = require("../controllers/authController");

const auth = require("../middleWare/auth");


router.post("/login", login);
router.get("/me", auth.authenticateToken, getMe);

module.exports = router;
