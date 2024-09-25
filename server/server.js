/* Initialize Express */
const express = require('express');
const app = express();
const http = require('http');
const config = require('../config');
const sequelize = require('./sequelize/database');
const cors = require('cors');
const front_router = require('./front');
const path = require('path');
const hbs = require('hbs');
const api = require('./api');
const fs = require('fs');


const baseUrl = `${config.protocol}://${config.hostname}:${config.port}`;

// Serve static assets (CSS, images, JS) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS
app.use(cors());

// App context
app.set('config', config);

// Utiliser body-parser pour lire les données envoyées dans les requêtes POST
app.use(express.json());

// Templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, '../views/partials'));
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

// Error handling middleware for 404
app.use((req, res, next) => {
  res.status(404);
  res.render('errors/404');
});

// Error handling middleware for 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('errors/500'); 
});

const server = http.createServer(opts, app);

server.on('error', (error) => {
  console.error('HTTP Server Error:', error.message);
});

// Start the server
app.listen(config.port, () => {
  console.log(`Serveur en écoute sur ${baseUrl}`);
});
