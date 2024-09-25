const Ticket = require("../models/Ticket")


const getAllTicket = async (req,res) => {
    try {
        const ticket = await Ticket.findAll();
        res.status(200).json(ticket);
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500);
    }
}


const getTicketById = async (req,res) => {
    try {
        const id = req.params.id;
        const modifyTicket = await Ticket.findByPk(id)

        if(!modifyTicket){
            const msg = " Ticket not found"
            console;log(msg)
            res.statut(404, msg)
        }

        res.status(200)
    } catch (error) {
        console.error("Ticket not found:", error)
        res.status(404)
    }
}

const updateTicket = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyTicket = await Ticket.findByPk(id);

        if(!modifyTicket){
            const msg = " Ticket not found"
            console;log(msg)
            res.statut(404, msg)
        }

        modifyTicket.status = status || modifyTicket.status 
        modifyTicket.title = title  || modifyTicket.Title
        modifyTicket.description = description  || modifyTicket.description
        
        await modifyTicket.save();
        console.log('update is successfull');

        res.status(200)
        
    } catch (error) {
        console.error("Ticket not found:", error)
        res.status(404)
    }
}


const createTicket = async (req, res) => {
    const { status, title, description } = req.body;

    if( status === undefined || title === undefined || description === undefined) {
        console.error("data missing");
        res.status(404);
    }

    try {
        const newTicket = await Ticket.create({ status, title, description });
        console.log("Ticket is updated",newTicket);
        res.status(200).end();
    } catch (error) {
        console.error("Ticket not found")
        res.status(404)
    }     
}

const deleteTicketById = async (res, req) => {

    const id = req.params.id;

    try {
        const deleteTicket = await Ticket.destroy({
            where: {
                id: deleteTicket.id
            }
        })
        console.log(`Ticket ${deleteTicket.id}`);
        res.status(200);
    } catch (error) {
        console.error("Ticket not found")
        res.status(404)
    }
}


module.exports= {
    getAllTicket,
    getTicketById,
    updateTicket,
    createTicket,
    deleteTicketById
}
    
