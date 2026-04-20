const {requireAuth} = require ('../Middleware/auth');
const router = require ('express').Router();

/**
 * Route pour la verif de la connexion
 */
router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ message: "accès réussi " })
})

module.exports = router;