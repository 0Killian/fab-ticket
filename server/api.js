const express = require("express")
const router = express.Router();
const ticketController = require("../controller/ticketController");

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
router.get("/emprunt", BurrowController.getAllBurrow);
router.get("/emprunt/:id", BurrowController.getBurrowById);
router.post("/emprunt", BurrowController.createBurrow);
router.put("/emprunt", BurrowController.updateBurrow);
router.delete("/emprunt", BurrowController.deleteBurrowById);

module.exports = Router