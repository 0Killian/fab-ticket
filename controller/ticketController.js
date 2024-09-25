const Ticket = require("../models/Ticket")


const getAllTicket = async (res,req) => {
    try {
        const Ticket = await Ticket.findAll();
        res.status(200).json("get all tickets")
    } catch (error) {
        console.error("error to get user:", error)
        res.status(402).json("error")
    }
}

const getTicketById = async (res,req) => {
    try {
        const id = req.params.id;
        const modifyTicket = await Ticket.findByPk(id)

        if(!modifyTicket){
            const msg = " Ticket not found"
            console;log(msg)
            res.status(404, msg)
        }

        res.status(200).json(`find id: ${id}`)
    } catch (error) {
        console.error("Ticket not found:", error)
        res.status(404).json("Ticket not found:", error)
    }
}

const updateTicket = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyTicket = await Ticket.findByPk(id);

        if(!modifyTicket){
            const msg = "Ticket not found"
            console;log(msg)
            res.status(404, msg)
        }

        modifyTicket.status = req.body.status || modifyTicket.status 
        modifyTicket.title = req.bodytitle  || modifyTicket.Title
        modifyTicket.description = req.body.description  || modifyTicket.description
        
        await modifyTicket.save();
        console.log('update is successfull');

        res.status(200).json("update successfull")
        
    } catch (error) {
        console.error("Ticket not found:", error)
        res.status(404).json("Ticket not found:", error)
    }
}



const createTicket = async(res, req) => {

    const { status, title, description }  = req.body

    if( !status || !title || !description ){
        console.error("error not found")
        res.status(404)
    }

    try {
        const newTicket = Ticket.create({ status, title, description });
        console.log("Ticket is updated",newTicket);
        res.status(200).json("Ticket is updated",newTicket)
    } catch (error) {
        console.error("Ticket not found")
        res.status(404).json("Ticket not found")
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
        console.log(`Ticket ${id}`);
        res.status(200).json(`Ticket ${id} is deleted`);
    } catch (error) {
        console.error("Ticket not found")
        res.status(404).json("Ticket not found")
    }
}


module.exports= {
    getAllTicket,
    getTicketById,
    updateTicket,
    createTicket,
    deleteTicketById
}
    