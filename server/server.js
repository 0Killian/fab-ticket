/* init express */
const express = require('express');
const app = express();
const http = require('http');
const ldap = require('ldapjs');
const bodyParser = require('body-parser');  // Permet d'interpréter les requêtes POST avec le body JSON
const config = require('../config');
const sequelize = require('./sequelize/database');
const cors = require('cors');
const front_router = require('./front');
const path = require('path');
const hbs = require('hbs');

// Ajoutez le middleware CORS
app.use(cors());
app.set('config', config);
// Utiliser body-parser pour lire les données envoyées dans les requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

hbs.registerPartials(path.join(__dirname, '../components'));

app.use('/', front_router);

// Démarre le serveur HTTP
const server = http.createServer(app);

server.on('error', (error) => {
  console.error('Erreur de serveur HTTP :', error.message);
});

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`Serveur en écoute sur http://${config.hostname}:${config.port}`);
});
