const { Ticket } = require("../models/index")

const getAllTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findAll();
        res.status(200).json(ticket
            .map(ticket => {
                return ticket.dataValues
            })
        );
    } catch (error) {
        console.error("Failed to get tickets:", error)
        res.status(500).end();
    }
}

const getTicketById = async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            console.log("Ticket not found");
            res.status(404).end();
            return;
        }

        res.status(200).json(ticket.dataValues);
    } catch (error) {
        console.error("Ticket not found:", error);
        res.status(404).end();
    }
}

const updateTicket = async(req, res) => {
    const id = req.params.id;
    try {
        let { status, title, description } = req.body;

        if( title === undefined || description === undefined) {
            console.error("Missing parameters");
            res.status(400).end();
            return;
        }

        const modifyTicket = await Ticket.findByPk(id);

        if (!modifyTicket) {
            console.log("Ticket not found: " + id);
            res.status(404).end();
            return;
        }

        if (req.user.uid !== modifyTicket.author && !req.user.groups.includes(req.app.get('config').ldap.adminGroup)) {
            console.error("Unauthorized access");
            res.status(403).end();
            return;
        }

        console.log(status, " ", req.user.groups.includes(req.app.get('config').ldap.adminGroup));
        if (status !== undefined && req.user.groups.includes(req.app.get('config').ldap.adminGroup)) {
            modifyTicket.status = status;
        }
        
        modifyTicket.title = title || modifyTicket.title;
        modifyTicket.description = description || modifyTicket.description
        
        await modifyTicket.save();
        console.log('Update ticket ' + id + ' successfully');

        res.status(200).end();
    } catch (error) {
        console.error("Failed to update ticket " + id + ":", error);
        res.status(404).end();
    }
}

const createTicket = async (req, res) => {
    const { title, description } = req.body;
    const author = req.user.uid;

    if( title === undefined || description === undefined) {
        console.error("Missing parameters");
        res.status(400).end();
        return;
    }

    try {
        const newTicket = await Ticket.create({ title, description, author, creationDate: new Date() });
        console.log("Created new ticket: ", newTicket.dataValues);
        res.status(200).end();
    } catch (error) {
        console.error("Failed to create new ticket:", error);
        res.status(500).end();
    }     
}

const deleteTicketById = async (req, res) => {
    const id = req.params.id;

    try {
        await Ticket.destroy({
            where: {
                id: id
            }
        })

        console.log(`Ticket ${id} is deleted`);
        res.status(200).end();
    } catch (error) {
        console.error("Failed to delete ticket " + id + ":", error);
        res.status(500).end();
    }
}


module.exports = {
    getAllTicket,
    getTicketById,
    updateTicket,
    createTicket,
    deleteTicketById
}