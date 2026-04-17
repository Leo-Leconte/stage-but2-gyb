const {requireAuth} = require ('../Middleware/auth');
const router = require ('express').Router();

// route pour l'authentification'
router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ message: "accès  réussi " })
})

module.exports = router;