const auth = require('./auth');
let router = require('express').Router();
const ticketController = require("../controller/ticketController");
const borrowController = require("../controller/borrowController");
const materialController = require("../controller/materialController");
const { Op } = require('sequelize');

const Ticket = require("../models/Ticket");
const Borrow = require("../models/Borrow");
const Material = require("../models/Material");

// create ticket
router.get('/ticket/create', ticketController.createTicket, (req, res) => {
    res.render('createTicket', { title: 'Créer un Ticket' });
});

// list all ticket
router.get('/tickets', async (req, res) => {
    const config = req.app.get('config');
    let page = req.query.page || 1;
    let limit = 10;
    let offset = (page - 1) * limit;

    let tickets = await Ticket.findAll({
        limit: limit,
        offset: offset
    });

    let next = await Ticket.count({
        offset: offset + limit
    }) > 0;

    let previous = page > 1;
    tickets = await Promise.all(tickets
        .map(ticket => ticket.dataValues)
        .map(async ticket => {
            let author = await auth.getUser(config, ticket.author);
            return {
                ...ticket,
                description: ticket.description.substring(0, 20) + (ticket.description.length > 20 ? '...' : ''),
                author: author.givenName + " " + author.sn
            }
        })
        .map(async t => {
            let ticket = await t;
            
            if (ticket.status === 0) {
                ticket.status = "Ouvert";
                ticket.statusClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            } else if (ticket.status === 1) {
                ticket.status = "En cours";
                ticket.statusClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            } else if (ticket.status === 2) {
                ticket.status = "Fermé";
                ticket.statusClasses = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            }

            return ticket;
        }));

    console.log(tickets);

    res.render('tickets', { layout: 'main', title: 'Liste des Tickets', tickets, page, next, previous });
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
router.get('/borrows', borrowController.getAllBorrow ,(req, res) => {
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

let adminRouter = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', {title: 'Connexion' });
});

adminRouter.get('/dashboard', async (req, res) => {
    let opened_tickets_count = await Ticket.count({
        where: { status: 0 }
    });

    let ongoing_borrows_count = await Borrow.count({
        where: { endDate: { [Op.gt]: new Date() } } // Use endDate instead of end_date
    });

    let created_tickets_count = await Ticket.count({
        where: {
            creationDate: {
                [Op.gt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        }
    });

    let closed_tickets_count = await Ticket.count({
        where: {
            status: 2,
            creationDate: {
                [Op.gt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        }
    });

    let items_count = await Material.count();
    res.render('dashboard', { layout: 'main', title: 'Dashboard', opened_tickets_count, ongoing_borrows_count, items_count, created_tickets_count, closed_tickets_count });
});

adminRouter.get('/inventory', (req, res) => {
    res.render('inventory', {layout: 'main', title: 'Inventaire' });
});


router.get('/tickets', (req, res) => {
    res.render('tickets', {layout: 'main', title: 'Tickets'});
});

router.get('/borrows', auth.isAuthenticated, (req, res) => {
    res.render('borrows', {layout: 'main', title: 'Emprunts'});
});

router.use('/admin', adminRouter);

router.get('/login', (req, res) => {
    res.render('login', {title: "Login"});
});

module.exports = router;

