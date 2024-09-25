/* Initialize Express */
const express = require('express');
const app = express();
const http = require('http');
const ldap = require('ldapjs');
const bodyParser = require('body-parser');  // Parse POST requests with JSON body
const config = require('../config');
const sequelize = require('./sequelize/database');
const cors = require('cors');
const front_router = require('./front');
const path = require('path');
const hbs = require('hbs');

const baseUrl = '${config.protocol}://${config.hostname}:${config.port}';


// Serve static assets (CSS, images, JS) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS
app.use(cors());

// App context
app.set('config', config);

// Use body-parser to read POST request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.locals = {
  baseUrl: baseUrl
};

// Frontend router
app.use('/', front_router);

// Configuration du serveur
let opts = {};
if (config.https.key && config.https.cert) {
  opts = {
    key: fs.readFileSync(config.https.key),
    cert: fs.readFileSync(config.https.cert)
  };
}

const server = http.createServer(opts, app);

server.on('error', (error) => {
  console.error('HTTP Server Error:', error.message);
});

// Start the server
app.listen(config.port, () => {
  console.log(`Serveur en écoute sur ${baseUrl}`);
});
