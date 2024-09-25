const express = require("express")
const router = express.Router();
const ticketController = require("../controller/ticketController");
const borrowController = require("../controller/borrowController");
const materialController = require("../controller/materialController");


/**
 * ticket CRUD
 */
router.get("/ticket", ticketController.getAllTicket);
router.get("/ticket/:id", ticketController.getTicketById);
router.post("/ticket", ticketController.createTicket);
router.put("/ticket", ticketController.updateTicket);
router.delete("/ticket/:id", ticketController.deleteTicketById);

/**
 * 
 * emprunt
 */
router.get("/borrrow", borrowController.getAllBorrow);
router.get("/borrrow/:id", borrowController.getBorrowById);
router.post("/borrrow", borrowController.createBorrow);
router.put("/borrrow", borrowController.updateBorrow);
router.delete("/borrrow/:id", borrowController.deleteBorrowById);


/**
 * Material
 */
router.get("/material", materialController.getAllMaterial);
router.get("/material/:id", materialController.getMaterialById);
router.post("/material", materialController.createMaterial);
router.put("/material", materialController.updateMaterial);
router.delete("/material/:id", materialController.deleteMaterialById);


module.exports = router