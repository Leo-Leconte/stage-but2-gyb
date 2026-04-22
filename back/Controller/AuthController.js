const blacklist = require("../src/Store/Blacklist");

// permet de se deconnecter
const logout = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    blacklist.add(token); // ajout du token dans la blacklist, permet de se deconnecter
    return res.status(200).json({ message: "Déconnexion réussie" });
};

// login ici



module.exports = { blacklist, logout };