const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

function authorize(...roles) {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();

    };

}

module.exports = {
                    authorize,
                    authenticateToken
                };

