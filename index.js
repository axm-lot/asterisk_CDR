// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: '192.168.1.254',
    database: 'asterisk',
    password: 'password',
    port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cdr');
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/count_cdr', (req, res) => {
    pool.query(
        'SELECT COUNT(*) AS count FROM cdr',
        (err, result) => {
            if (err) {
                console.error('Erreur lors du comptage des enregistrements :', err);
                res.status(500).send('Erreur lors du comptage des enregistrements');
            } else {
                const count = result.rows[0].count;
                res.status(200).json({ count });
            }
        }
    );
});


app.post('/signin', (req, res) => {
    const { nom, mdp } = req.body;

    pool.query(
        'SELECT * FROM login WHERE username = $1 AND password = $2',
        [nom, mdp],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération de login :', err);
                res.status(500).send('Erreur lors de la récupération de login');
            } else {
                if (result.rowCount === 0) {
                    res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
                } else {
                    res.status(200).send('Authentification réussie');
                }
            }
        }
    );
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
