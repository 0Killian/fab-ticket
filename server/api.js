const express = require("express")
const router = express.Router();
const auth = require("./auth");
const ticketController = require("../controller/ticketController");
const borrowController = require("../controller/borrowController");
const materialController = require("../controller/materialController");
const searchController = require("../controller/searchController");

/**
 * ticket CRUD
 */
router.get("/ticket", auth.isAuthenticated, ticketController.getAllTicket);
router.get("/ticket/:id", auth.isAuthenticated, ticketController.getTicketById);
router.post("/ticket", auth.isAuthenticated, ticketController.createTicket);
router.put("/ticket/:id", auth.isAuthenticated, ticketController.updateTicket);
router.delete("/ticket/:id", auth.isAuthenticated, auth.isAdmin, ticketController.deleteTicketById);

/**
 * 
 * emprunt
 */
router.get("/emprunt", borrowController.getAllBorrow);
router.get("/emprunt/:id", borrowController.getBorrowById);
router.post("/emprunt", borrowController.createBorrow);
router.put("/emprunt", borrowController.updateBorrow);
router.delete("/emprunt", borrowController.deleteBorrowById);

/**
 * Material
 */
router.get("/material", materialController.getAllMaterial);
router.get("/material/:id", materialController.getMaterialById);
router.post("/material", materialController.createMaterial);
router.put("/material", materialController.updateMaterial);
router.delete("/material/:id", materialController.deleteMaterialById);

router.get("/search", searchController.search);

router.post('/login', auth.isNotAuthenticated, async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        console.error("Missing parameters");
        res.status(400);
    }

    const user = await auth.authenticate(req.app.get('config'), username, password);
    if (user) {
        const token = auth.createToken(req.app.get('config'), user);

        let redirect = '/tickets'
        console.log(user);
        if (user.groups.includes(req.app.get('config').ldap.adminGroup)) {
            redirect = '/admin/dashboard'
        }

        res.status(200).json({ token, redirect });
    } else {
        res.status(404).end();
    }
})

module.exports = router
