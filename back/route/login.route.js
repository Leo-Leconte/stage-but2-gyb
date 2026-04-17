const pool = require ('../src/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require ('express').Router();

router.post("/login", async (req, res) => {
    const { nom, mot_de_passe } = req.body || {};

    if (!nom|| !mot_de_passe) {
        return res.status(400).json({
            "success": false,
            "message": "Champ texte requis."
        });
    }

    try {
        const result = await pool.query(
            "SELECT id_collaborateur, nom, mot_de_passe FROM gyb_stage.collaborateur WHERE nom = $1 LIMIT 1",
            [nom]
        );

        const collaborateur = result.rows[0];

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Collaborateur inconnu." });
        }

        const ok = await bcrypt.compare(mot_de_passe, collaborateur.mot_de_passe);

        if (!ok) {
            return res.status(401).json({ message: "Nom ou Mot de passe incorrect." }); // toujours dire que le nom ou le mot de passe est incorrect pour éviter les attaques par brute force
        }

        const token = jwt.sign(
            {
                id_collaborateur: collaborateur.id_collaborateur,
                nom: collaborateur.nom
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }
        );

        return res.status(200).json({
            success: true,
            data: {
                Token: token,
                "type du token": "bearer",
                "Expire dans (sec)": 3600 ,
                nom_utilisateur: collaborateur.nom
            },
            message: "Connexion établie avec succès"
        });
    } catch (err) {
        console.error("erreur sur la connexion", err);
        return res.status(500).json({ message: "Erreur cote serveur" });
    }
});

module.exports = router;