const { Pool } = require("pg");

// Connexion a la base de donnees
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;