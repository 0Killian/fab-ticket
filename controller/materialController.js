const Material = require("../models/Material")
const condition = require("../models/Condition")


const getAllMaterial = async (req,res) => {
    try {
        const materials = await Material.findAll();
        console.log(materials);
        res.status(200).json(materials);
    } catch (error) {
        console.error("error to get matérial list:", error)
        res.status(402).json("error to get matérial list:")
    }
}

const getMaterialById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10) ;

        const selectedMaterial = await Material.findByPk(id);

        if (!selectedMaterial) {
            const msg = "Material not found!";
            console.log(msg);
            res.status(404).json({ message: msg });
        }
        return res.status(200).json(selectedMaterial);
    } catch (error) {
        console.error("Error retrieving material:", error);
        res.status(500).json({ message: "Error retrieving material" });
    }
};

const updateMaterial = async(req, res) =>{
    try {
        const id = parseInt(req.params.id, 10) ;
        let { inventoryId, description, categoryId, photo, buyDate, conditionId } = req.body;
        
        if( inventoryId === undefined || description === undefined || categoryId === undefined ||  photo === undefined ||  buyDate=== undefined ||  conditionId === undefined ) {
            console.error("Missing parameters");
            res.status(400).end();
            return;
        }

        const modifyMaterial = await Material.findByPk(id);
        console.log(modifyMaterial)

        if(!modifyMaterial){
            const msg = ("material not found " + id)
            console;log(msg)
            res.status(404, msg)
        }

        modifyMaterial.inventoryId = inventoryId  || modifyMaterial.inventoryId  
        modifyMaterial.description = description  || modifyMaterial.description  
        modifyMaterial.categoryId =  categoryId  || modifyMaterial.categoryId  
        modifyMaterial.inventoryI = photo  || modifyMaterial.photo  
        modifyMaterial.inventoryId =  buyDate  || modifyMaterial.buyDate  
        modifyMaterial.inventoryId =  conditionId  || modifyMaterial.conditionId  
        
        await modifyMaterial.save();
        console.log('update is successfull',modifyMaterial );

        return res.status(200).json('update is successfull')
        
    } catch (error) {
        console.error("Material not found:", error)
        res.status(404).json("not found")
    }
}

const createMaterial = async (req, res) => {
    const { inventoryId, description, categoryId, photo, buyDate, conditionId } = req.body;

    if (!inventoryId || !description || !categoryId || !photo || !buyDate || !conditionId) {
        console.error("error not found");
        return res.status(404).json('error not found');  
    }

    try {
        const newMaterial = await Material.create({ inventoryId, description, categoryId, photo, buyDate, conditionId });
        console.log("Material is updated", newMaterial);
        return res.status(200).json("Material is updated");  
    } catch (error) {
        console.error("Error during material creation", error);
        return res.status(500).json("Material not created");  
    }     
};

const deleteMaterialById = async (res, req) => {
    const id = req.params.id;

    try {
        const deleteMaterial = await Material.destroy({
            where: {
                id: deleteMaterial.id
            }
        })
        console.log(`Material ${id}`);
        res.status(200).json(`Material ${id}`);
    } catch (error) {
        console.error("Material not found")
        res.status(404).json(`Material ${id} not found`)
    }
}

/**
 * 
 *   CONTROLLER CONDITIONS
 *  
 */
const getAllCondition = async (req,res) => {
    try {
        const conditions = await condition.findAll();
        console.log(conditions)
        res.status(200).json("get all condition"+ conditions)
    } catch (error) {
        console.error("error to get ", error)
        res.status(500).json("error to get al material")
    }
}


const getConditionById = async (req,res) => {
    try {

        const id = parseInt(req.params.id, 10);
        const selectedCondition = await condition.findByPk(id)

        if(!selectedCondition){
            const msg = " condition not found"
            console.log(msg)
            res.status(404, msg)
        }

        res.status(200).json(selectedCondition)
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404).json("id not found")
    }
}


const updateCondition = async(res, req) =>{
    try {
        const id = parseInt(req.params.id, 10);
        const modifyCondition = await condition.findByPk(id);

        const {name, description }  = req.body

        if( name === undefined || description === undefined ) {
            console.error("Missing parameters");
            res.status(400).end();
            return;
        }

        modifyCondition.name = name  || modifyCondition.name
        modifyCondition.description = description  || modifyCondition.description  
        
        await modifyCondition.save();
        console.log('update is successfull', modifyCondition);

        res.status(200).json("successfull")
        
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404).json("condition not found:")
    }
}

const createCondition = async(res, req) => {

    const {name, description }  = req.body

    if( name === undefined || description === undefined ) {
        console.error("Missing parameters");
        res.status(400).end();
        return;
    }

    try {
        const newCondition = condition.create({ name, description });
        console.log("condition is updated", newCondition);
        res.status(200).json("condition is updated")
    } catch (error) {
        console.error("condition not found", error)
        res.status(404).json("condition not found")
    }     
}

const deleteconditionById = async (res, req) => {

    const id = req.params.id;

    try {
        const deleteCondition = await condition.destroy({
            where: {
                id: deleteCondition.id
            }
        })
        console.log(`condition ${id}`);
        res.status(200).json(`condition ${id} deleted`)
    } catch (error) {
        console.error("condition not found")
        res.status(404).json("not found")
    }
}

module.exports= {
    getAllMaterial,
    getMaterialById,
    updateMaterial,
    createMaterial,
    deleteMaterialById,
    getAllCondition,
    getConditionById,
    updateCondition,
    createCondition,
    deleteconditionById
}
    
