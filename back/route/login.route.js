const pool = require ('../src/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require ('express').Router();


/**
 * Permet la connexion d'un collaborateur'
 *
 * @name Post
 * @path {POST} /login
 * @code {200} succès
 * @response {string} connexion établie
 */

router.post("/login", async (req, res) => {
    const { email, mot_de_passe } = req.body || {};

    // si un des champs est vide
    if (!email|| !mot_de_passe) {
        return res.status(400).json({
            "success": false,
            "message": "Champ texte requis."
        });
    }

    try {
        const result = await pool.query(
            "SELECT id_collaborateur, email, mot_de_passe,nom FROM gyb_stage.collaborateur WHERE email = $1 LIMIT 1",
            [email]
        ); // requete sql pour recuperer le nom et le mot de passe de l'utilisateur

        const collaborateur = result.rows[0];

        if (result.rows.length === 0) { // requete sql pour verifier si l'utilisateur existe
            return res.status(401).json({ message: "Collaborateur inconnu." });
        }

        const ok = await bcrypt.compare(mot_de_passe, collaborateur.mot_de_passe); // Verification du mot de passe tout en le gardant crypte

        if (!ok) {
            return res.status(401).json({ message: "Email ou Mot de passe incorrect." }); // toujours dire que le nom ou le mot de passe est incorrect pour éviter les attaques par brute force
        }

        // creation du token
        const token = jwt.sign(
            {
                id_collaborateur: collaborateur.id_collaborateur,
                email: collaborateur.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600 } // 1 heure
        );

        // reponse au client
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
    } catch (err) { // si une erreur survient
        console.error("erreur sur la connexion", err);
        return res.status(500).json({ message: "Erreur cote serveur" });
    }
});

module.exports = router;