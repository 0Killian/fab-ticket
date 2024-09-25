const auth = require('./auth');
let router = require('express').Router();
const ticketController= require("../models/Ticket");
const burrowController= require("../models/Burrow");
const materialController= require("../models/Material");



// create ticket
router.get('/ticket/create', ticketController.createTicket, (req, res) => {
    res.render('createTicket', { title: 'Créer un Ticket' });
});

// list all ticket
router.get('/tickets', ticketController.getAllTicket ,(req, res) => {
    res.render('tickets', { title: 'Liste des Tickets' });
});

// select 1 tickt
router.get('/ticket/:id', ticketController.getTicketById, (req, res) => {
    res.render('ticketDetails', { title: 'Détails du Ticket', ticketId: req.params.id });
});



// create burrow
router.get('/burrows/create', burrowController.createBurrow, (req, res) => {
    res.render('createBurrows', { title: 'Créer un Ticket' });
});

// list all burrows
router.get('/burrows', burrowController.getAllBurrow ,(req, res) => {
    res.render('burrows', { title: 'Liste des Tickets' });
});

// select 1 tiquet
router.get('/burrows/:id', (req, res) => {
    res.render('burrowsDetails', { title: 'Détails du Ticket', ticketId: req.params.id });
});


// create material
router.get('/material/create', materialController.createMaterial, (req, res) => {
    res.render('createMaterial', { title: 'Créer un Ticket' });
});

// list all materials
router.get('/material', materialController.getAllMaterial ,(req, res) => {
    res.render('burrows', { title: 'Liste des Tickets' });
});

// select 1 material
router.get('/material/:id', materialController.getMaterialById,(req, res) => {
    res.render('materialDetails', { title: 'Détails du Ticket', ticketId: req.params.id });
});

module.exports = router;
