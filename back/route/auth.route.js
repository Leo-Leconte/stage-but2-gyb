const {requireAuth} = require ('../Middleware/auth');
const router = require ('express').Router();

router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ message: "accès  réussi" })
})

module.exports = router;