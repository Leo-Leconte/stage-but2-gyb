const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET);
}

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer")) return res.status(401).json({ message: "Token invalide" });

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token invalide" });
    }

    try {
        const payload = verifyJwt(token);
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(403).json({
            message:
                "Vous pouvez pas acceder a cette ressource car vous n'etes pas un collaborateur",
        });
    }
}

module.exports = { requireAuth };