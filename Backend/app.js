/* init express */
const express = require('express');
const app = express();
const http = require('http');
const ldap = require('ldapjs');
const bodyParser = require('body-parser');  // Permet d'interpréter les requêtes POST avec le body JSON
const config = require('./config');
const sequelize = require('./sequelize/database');
const cors = require('cors');

// Ajoutez le middleware CORS
app.use(cors());

// Utiliser body-parser pour lire les données envoyées dans les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log(config.port);

// Démarre le serveur HTTP
const server = http.createServer(app);

server.on('error', (error) => {
  console.error('Erreur de serveur HTTP :', error.message);
});

// Route simple pour l'API
app.get('/api', (req, res) => {
  res.json({ message: "Hello from server!" });
});

// LDAP Client
const client = ldap.createClient({
  url: 'ldap://176.132.181.155:389'
});

// Fonction d'authentification via LDAP
function authenticate(username, password, callback) {
  const dn = `uid=${username},ou=users,dc=mydil-nantes,dc=fr`;
  
  client.bind(dn, password, (err) => {
    if (err) {
      console.error('Erreur de liaison :', err);
      return callback(false);
    }
    console.log('Authentification réussie');
    return callback(true);
  });
}

// Route pour l'authentification
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  authenticate(username, password, (success) => {
    if (success) {
      res.send('Authentification réussie');
    } else {
      res.status(401).send('Échec de l\'authentification');
    }
  });
});

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`Serveur en écoute sur http://localhost:${config.port}`);
});