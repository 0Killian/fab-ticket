const borrow = require("../models/Borrow")


const getAllBorrow = async (req,res) => {
    try {
        const borrows = await borrow.findAll();
        console.log(borrows)
        res.status(200)
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500)
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

        res.status(200)
    } catch (error) {
        console.error("borrow not found:", error)
        res.status(404)
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

        modifyBorrow.startDate = startDate   || modifyBorrow.startDate 
        modifyBorrow.endDate = endDate   || modifyBorrow.endDate 
        modifyBorrow.userId  || modifyBorrow.userId  
        modifyBorrow.materialId = materialId  || modifyBorrow.materialId
        modifyBorrow.description = commentary  || modifyBorrow.commentary 
        
        await modifyBorrow.save();
        console.log('update is successfull');

        res.status(200)
        
    } catch (error) {
        console.error("Borrow not found:", error)
        res.status(404)
    }
}

const createBorrow = async(res, req) => {

    const { startDate, endDate, userId, materialId, commentary }  = req.body

    if( !startDate || !endDate ||  !userId || !materialId || !commentary ){
        console.error("error not found")
        res.status(404)
    }

    try {
        const newBorrow = borrow.create({ startDate, endDate, userId, materialId, commentary });
        console.log("Borrow is updated", newBorrow);
        res.status(200)
    } catch (error) {
        console.error("Borrow not found", newBorrow)
        res.status(404)
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
        res.status(200);
    } catch (error) {
        console.error("Borrow not found")
        res.status(404)
    }
}


module.exports= {
    getAllBorrow,
    getBorrowById,
    updateBorrow,
    createBorrow,
    deleteBorrowById
}
    