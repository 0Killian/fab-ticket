/* init express */
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');  // Permet d'interpréter les requêtes POST avec le body JSON
const config = require('../config');
const sequelize = require('./sequelize/database');
const cors = require('cors');
const front_router = require('./front');
const path = require('path');
const hbs = require('hbs');
const api = require('./api');

const baseUrl = '${config.protocol}://${config.hostname}:${config.port}';

// Ajoutez le middleware CORS
app.use(cors());

// App context
app.set('config', config);

// Utiliser body-parser pour lire les données envoyées dans les requêtes POST
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
hbs.registerPartials(path.join(__dirname, '../components'));
app.locals = {
  ...app.locals,
  baseUrl: baseUrl
};

// Frontend router
app.use('/', front_router);
app.use('/api', api);

// Configuration du serveur
let opts = {};
if (config.https) {
  opts = {
    key: fs.readFileSync(config.https.key),
    cert: fs.readFileSync(config.https.cert)
  };
}

const server = http.createServer(opts, app);

server.on('error', (error) => {
  console.error('Erreur de serveur HTTP :', error.message);
});

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`Serveur en écoute sur ${baseUrl}`);
});
