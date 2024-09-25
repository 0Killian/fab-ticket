const auth = require('./auth');
let router = require('express').Router();
const ticketController = require("../controller/ticketController");
const borrowController = require("../controller/borrowController");
const materialController = require("../controller/materialController");


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

/**
 *  BORROW
 */

// create borrow
router.get('/borrows/create', borrowController.createBorrow, (req, res) => {
    res.render('createBorrows', { title: 'Créer un Ticket' });
});

// list all borrows
router.get('/borrows', borrowController.getAllBurrow ,(req, res) => {
    res.render('borrows', { title: 'Liste des Tickets' });
});

// select 1 tiquet
router.get('/borrows/:id', borrowController.getBorrowById, (req, res) => {
    res.render('borrowsDetails', { title: 'Détails du Ticket', ticketId: req.params.id });
});

/**
 * material
 */

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
