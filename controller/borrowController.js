const borrow = require("../models/Borrow")


const getAllBorrow = async (req,res) => {
    try {
        const borrows = await borrow.findAll();
        console.log(borrows);
        res.status(200).json(borrows);
    } catch (error) {
        console.error("Failed to get borrows:", error)
        res.status(500);
    }
}

const getBorrowById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedBorrow = await borrow.findByPk(id);
        if(!selectedBorrow) {
            console.log("borrow not found");
            res.statut(404);
        }

        res.status(200).json(selectedBorrow);
    } catch (error) {
        console.error("Failed to get borrow:", error);
        res.status(500);
    }
}


const updateBorrow = async (req, res) =>{
    try {
        const id = req.params.id;
        const modifyBorrow = await borrow.findByPk(id);

        const { startDate, endDate, userId, materialId, commentary } = req.body;

        if(!modifyBorrow) {
            console.log("borrow not found");
            res.statut(404);
        }

        modifyBorrow.startDate = startDate || modifyBorrow.startDate;
        modifyBorrow.endDate = endDate || modifyBorrow.endDate;
        modifyBorrow.userId = userId || modifyBorrow.userId;
        modifyBorrow.materialId = materialId || modifyBorrow.materialId;
        modifyBorrow.description = commentary || modifyBorrow.commentary;

        await modifyBorrow.save();
        console.log('update is successfull');

        res.status(200);
    } catch (error) {
        console.error("Failed to update a borrow: ", error)
        res.status(500);
    }
}

const createBorrow = async (req, res) => {
    const { startDate, endDate, userId, materialId, commentary } = req.body;

    if( startDate === undefined || endDate === undefined || userId === undefined || !materialId === undefined|| commentary === undefined ){
        console.error("error not found");
        res.status(404);
    }

    try {
        const newBorrow = borrow.create({ startDate, endDate, userId, materialId, commentary });
        console.log("New borrow was created: ", newBorrow);
        res.status(200);
    } catch (error) {
        console.error("Failed to create a borrow:", error);
        res.status(500);
    }     
}

const deleteBorrowById = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteBorrow = await borrow.destroy({
            where: {
                id: deleteBorrow.id
            }
        });
        console.log("Deleted borrow", deleteBorrow.id);
        res.status(200);
    } catch (error) {
        console.error("Failed to delete borrow");
        res.status(500);
    }
}


module.exports = {
    getAllBorrow,
    getBorrowById,
    updateBorrow,
    createBorrow,
    deleteBorrowById
};
