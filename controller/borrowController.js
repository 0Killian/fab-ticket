const borrow = require("../models/Borrow")


const getAllBorrow = async (req,res) => {
    try {
        const borrows = await borrow.findAll();
        console.log(borrows)
        res.status(200).json("get all tickets")
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500).json("not founnd", error)
    }
}

const getBorrowById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedBorrow = await borrow.findByPk(id)
        if(!selectedBorrow){
            const msg = " borrow not found"
            console;log(msg)
            res.status(404, msg)
        }

        res.status(200).json(`find id: ${id}`)
    } catch (error) {
        console.error("borrow not found:", error)
        res.status(404).json("Ticket not found:", error)
    }
}


const updateBorrow = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyBorrow = await borrow.findByPk(id);

        if(!modifyBorrow){
            const msg = " Borrow not found"
            console;log(msg)
            res.status(404, msg)
        }

        modifyBorrow.startDate = req.body.startDate || modifyBorrow.startDate;
        modifyBorrow.endDate = req.body.endDate || modifyBorrow.endDate;
        modifyBorrow.userId = req.body.userId || modifyBorrow.userId;
        modifyBorrow.materialId = req.body.materialId || modifyBorrow.materialId;
        modifyBorrow.commentary = req.body.commentary || modifyBorrow.commentary;
        
        await modifyBorrow.save();
        console.log('update is successfull');
        res.status(200).json("update successfull")
        
    } catch (error) {
        console.error("Borrow not found:", error)
        res.status(404)
    }
}

const createBorrow = async(res, req) => {

    const { startDate, endDate, userId, materialId, commentary }  = req.body

    if( !startDate || !endDate ||  !userId || !materialId || !commentary ){
        console.error("error not found")
        res.status(404).json("Ticket not found:", error)
    }

    try {
        const newBorrow = borrow.create({ startDate, endDate, userId, materialId, commentary });
        console.log("Borrow is updated", newBorrow);
        res.status(200).json("Borrow is updated");
    } catch (error) {
        console.error("Borrow not found", newBorrow)
        res.status(404).json("Borrow not found")
    }     
}

const deleteBorrowById = async (res, req) => {

    const id = req.params.id;

    try {
        const deleteBorrow = await borrow.destroy({
            where: {
                id: deleteBorrow.id
            }
        })
        console.log(`Borrow ${deleteBorrow.id}`);
        res.status(200).json(`Borrow ${id} is deleted`)
    } catch (error) {
        console.error("Borrow not found")
        res.status(404).json("borrow not found")
    }
}


module.exports= {
    getAllBorrow,
    getBorrowById,
    updateBorrow,
    createBorrow,
    deleteBorrowById
}
    