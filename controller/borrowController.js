const { Borrow } = require("../models/index")


const getAllBorrow = async (req,res) => {
    try {
        const borrows = await Borrow.findAll();
        res.status(200).json(borrows.map(borrow => {
            return borrow.dataValues;
        }));
    } catch (error) {
        console.error("Failed to get borrows:", error);
        res.status(500).end();
    }
}

const getBorrowById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedBorrow = await Borrow.findByPk(id);

        if(!selectedBorrow) {
            console.log("Borrow not found:", id);
            res.status(404).end();
        }

        res.status(200).json(selectedBorrow.dataValues);
    } catch (error) {
        console.error("Failed to get borrow:", error);
        res.status(500).end();
    }
}


const updateBorrow = async (req, res) => {
    try {
        const id = req.params.id;
        const modifyBorrow = await Borrow.findByPk(id);

        const { startDate, endDate, author, materialId, description } = req.body;

        if (startDate === undefined || endDate === undefined || userId === undefined || materialId === undefined || description === undefined) {
            console.error("Missing parameters");
            res.status(400).end();
        }

        if(!modifyBorrow) {
            console.error("Borrow not found:", id);
            res.status(404).end();
        }

        modifyBorrow.startDate = startDate || modifyBorrow.startDate;
        modifyBorrow.endDate = endDate || modifyBorrow.endDate;
        modifyBorrow.author = author || modifyBorrow.author;
        modifyBorrow.materialId = materialId || modifyBorrow.materialId;
        modifyBorrow.description = description || modifyBorrow.description;

        await modifyBorrow.save();
        console.log("Updated borrow " + id + " successfully");

        res.status(200).end();
    } catch (error) {
        console.error("Failed to update a borrow: ", error)
        res.status(500).end();
    }
}

const createBorrow = async (req, res) => {
    const { startDate, endDate, author, materialId, commentary } = req.body;

    if( startDate === undefined || endDate === undefined || author === undefined || !materialId === undefined|| commentary === undefined ){
        console.error("Missing parameters");
        res.status(400).end();
    }

    try {
        const newBorrow = Borrow.create({ startDate, endDate, author, materialId, commentary });
        console.log("Created new borrow: ", newBorrow.dataValues);
        res.status(200).end();
    } catch (error) {
        console.error("Failed to create a borrow:", error);
        res.status(500).end();
    }     
}

const deleteBorrowById = async (req, res) => {
    const id = req.params.id;

    try {
        await borrow.destroy({
            where: {
                id: id
            }
        });
        console.log("Deleted borrow ", id);
        res.status(200).end();
    } catch (error) {
        console.error("Failed to delete borrow");
        res.status(500).end();
    }
}


module.exports = {
    getAllBorrow,
    getBorrowById,
    updateBorrow,
    createBorrow,
    deleteBorrowById
};
