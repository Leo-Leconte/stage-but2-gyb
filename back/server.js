// importation des modules
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/api/test', (req, res) => res.status(200).json({ message: 'Bien recu' }))

app.listen(port, () => console.log(`Serveur sur ecoute sur le port ${port}`));