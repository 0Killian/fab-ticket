const express = require("express")
const router = express.Router();
const auth = require("./auth");
const ticketController = require("../controller/ticketController");
const borrowController = require("../controller/borrowController");
const searchController = require("../controller/searchController");

/**
 * ticket CRUD
 */
router.get("/ticket", ticketController.getAllTicket);
router.get("/ticket/:id", ticketController.getTicketById);
router.post("/ticket", ticketController.createTicket);
router.put("/ticket", ticketController.updateTicket);
router.delete("/ticket", ticketController.deleteTicketById);


/**
 * 
 * emprunt
 */
router.get("/emprunt", borrowController.getAllBorrow);
router.get("/emprunt/:id", borrowController.getBorrowById);
router.post("/emprunt", borrowController.createBorrow);
router.put("/emprunt", borrowController.updateBorrow);
router.delete("/emprunt", borrowController.deleteBorrowById);

router.get("/search", searchController.search);

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        console.error("data missing");
        res.status(404);
    }

    const user = await auth.authenticate(req.app.get('config'), username, password);
    if (user) {
        const token = auth.createToken(user);
        res.status(200).json({ token });
    } else {
        res.status(404);
    }
})

module.exports = router
