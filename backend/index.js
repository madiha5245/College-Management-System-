const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const pool = require("./db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const attendanceRoutes = require("./routes/attendenceRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();
const port = 3000;


// Middleware
app.use(express.json());
app.use(cookieParser());


// Test database connection
pool.query("SELECT NOW()")
    .then((result) => {
        console.log("✅ Connected to Neon!");
        console.log(result.rows);
    })
    .catch((err) => {
        console.log("❌ Database connection failed");
        console.error(err);
    });


// Home
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// Routes
app.use("/auth", authRoutes);

app.use("/courses", courseRoutes);

app.use("/admin", adminRoutes);

app.use("/enrollments", enrollmentRoutes);

app.use("/attendance", attendanceRoutes);

app.use("/faculty", facultyRoutes);

//Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
