// importation des modules
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/api/test', (req, res) => res.status(200).json({ message: 'Bien reçu' })) // permet de tester le serveur

if (require.main === module) { // permet de lancer le serveur afin de differencier qui le lance et de pouvoir lancer le serveur en local et effectuer des test dessus
    app.listen(port, () => console.log(`Serveur sur ecoute sur le port ${port}`)); // permet de lancer le serveur et d avoir un log par derriere
}

module.exports = app; // permet de lancer le serveur