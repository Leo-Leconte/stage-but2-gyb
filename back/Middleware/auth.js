const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// verification du token
function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET);
}
// middleware pour verifier le token si il est valide est correspond bien au collaborateur
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer")) return res.status(401).json({ message: "Pas le bon type pour le token" }); // si le token n'est pas valide a cause du type de token

    const token = authHeader.split(" ")[1];

    // si le token n'est pas fourni
    if (!token) {
        return res.status(401).json({ message: "Mettez votre token " });
    }

    // si le token est fourni mais invalide
    try {
        const payload = verifyJwt(token);
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(403).json({
            message:
                "Token invalide",
        });
    }
}

module.exports = { requireAuth };