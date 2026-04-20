const {requireAuth} = require ('../Middleware/auth');
const {logout} = require("../Controller/AuthController");
const router = require ('express').Router();

/**
 * Route pour la verif de la connexion
 */
router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ message: "accès réussi " })
})

/**
 *  Route pour la deconnexion
 */
router.post('/logout', requireAuth, logout);

module.exports = router;