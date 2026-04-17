require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const loginRoute = require('./route/login.route');
const authRoute = require('./route/auth.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/test', (req, res) => res.send('Hello World!')); // route pour tester le serveur
app.use('/api/auth',loginRoute); // route pour la connexion
app.use('/api/auth',authRoute); // route pour le auth

// si le main est le module courant alors on lance le serveur
if (require.main === module) {
    app.listen(port, () => console.log(`Serveur sur ecoute sur le port ${port}`));
}

module.exports = app;