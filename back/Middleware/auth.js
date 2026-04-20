const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// verification du token
function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET);
}

// middleware pour verifier le token s'il est valide et qui correspondu bien au collaborateur
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Pas le bon type pour le token" }); // si le token n'est pas valide à cause du type de token

    const token = authHeader.split(" ")[1];

    // si le token n'est pas fourni
    if (!token) {
        return res.status(401).json({ message: "Mettez votre token " });
    }

    // si le token est fourni, mais invalide ou qu'il soit expirer

    try{
        req.user = verifyJwt(token);
        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") { // permet de vérifie si le token est expirer grace a jwt
            return res.status(401).json({ message: "Token expiré, reconnectez-vous" });
        }
        return res.status(403).json({ message: "Token invalide" });
    }
}

module.exports = { requireAuth };