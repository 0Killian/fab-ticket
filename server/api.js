const express = require("express")
const router = express.Router();
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

    if (username === "admin" && password === "admin") {
        res.status(200)
    } else {
        res.status(401)
    }
})

module.exports = router
