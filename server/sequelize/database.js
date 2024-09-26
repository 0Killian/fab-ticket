// Import Sequelize et autres modules nécessaires
const { Sequelize } = require('sequelize');
require('../../models');

// Importe la configuration de la base de données
const id = require('../../config.js');
const dbConfig = id.dbConfig;

// Importe les modèles, incluant l'instance Sequelize
// const { sequelize } = require('./models'); 
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect, // e.g. 'mysql', 'postgres', etc.
    logging: console.log, // Optionnel : pour voir les requêtes SQL dans la console
});

// Connexion à la base de données avec logging
async function connectToDatabase() {
    try {
        // Authentification à la base de données
        await sequelize.authenticate();
        console.log('Connection with SEQUELIZE has been established successfully.');

        // Synchronisation des modèles avec la base de données
        await sequelize.sync();
        console.log('Database synced successfully.');

    } catch (error) {
        console.error('Unable to connect or sync to the database with SEQUELIZE:', error);
        throw error;
    }
}

// Appelle la fonction pour initialiser la base de données
connectToDatabase();

module.exports = sequelize;
