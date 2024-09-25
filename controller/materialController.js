const Material = require("../models/Material")
const condition = require("../models/Condition")


const getAllMaterial = async (req,res) => {
    try {
        const materials = await Material.findAll();
        console.log(materials);
        res.status(200);
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500)
    }
}

const getMaterialById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedMaterial = await Material.findByPk(id)

        if(!selectedMaterial){
            const msg = " material not found"
            console;log(msg)
            res.statut(404, msg)
        }

        res.status(200)
    } catch (error) {
        console.error("Material not found:", error)
        res.status(404)
    }
}

const updateMaterial = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyMaterial = await Material.findByPk(id);

        if(!modifyMaterial){
            const msg = " material not found"
            console;log(msg)
            res.statut(404, msg)
        }

        modifyMaterial.inventoryId = inventoryId  || modifyMaterial.inventoryId  
        modifyMaterial.description = description  || modifyMaterial.description  
        modifyMaterial.categoryId = categoryId  || modifyMaterial.categoryId  
        modifyMaterial.inventoryId = photo  || modifyMaterial.photo  
        modifyMaterial.inventoryId = buyDate  || modifyMaterial.buyDate  
        modifyMaterial.inventoryId = conditionId  || modifyMaterial.conditionId  
        
        await selectedMaterial.save();
        console.log('update is successfull');

        res.status(200)
        
    } catch (error) {
        console.error("Material not found:", error)
        res.status(404)
    }
}

const createMaterial = async(res, req) => {

    const {inventoryId, description, categoryId, photo, buyDate, conditionId }  = req.body

    if( !inventoryId || !description || !categoryId || !photo || !buyDate | !conditionId ){
        console.error("error not found")
        res.status(404)
    }

    try {
        const newMaterial = Material.create({ inventoryId, description, categoryId, photo, buyDate, conditionId });
        console.log("Material is updated", newMaterial);
        res.status(200)
    } catch (error) {
        console.error("Material not found", newMaterial)
        res.status(404)
    }     
}

const deleteMaterialById = async (res, req) => {

    const id = req.params.id;

    try {
        const deleteMaterial = await Material.destroy({
            where: {
                id: deleteMaterial.id
            }
        })
        console.log(`Material ${deleteMaterial.id}`);
        res.status(200);
    } catch (error) {
        console.error("Material not found")
        res.status(404)
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
        res.status(200)
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500)
    }
}


const getConditionById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedCondition = await condition.findByPk(id)

        if(!selectedCondition){
            const msg = " condition not found"
            console;log(msg)
            res.statut(404, msg)
        }

        res.status(200)
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404)
    }
}


const updateCondition = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyCondition = await condition.findByPk(id);

        if(!modifyCondition){
            const msg = " condition not found"
            console;log(msg)
            res.statut(404, msg)
        }

        modifyCondition.name = inventoryId  || modifyCondition.name
        modifyCondition.description = description  || modifyCondition.description  
        
        await modifyCondition.save();
        console.log('update is successfull');

        res.status(200)
        
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404)
    }
}

const createCondition = async(res, req) => {

    const {name, description }  = req.body

    if( !name || !description ){
        console.error("error not found")
        res.status(404)
    }

    try {
        const newCondition = condition.create({ name, description });
        console.log("condition is updated", newCondition);
        res.status(200)
    } catch (error) {
        console.error("condition not found", newCondition)
        res.status(404)
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
        console.log(`condition ${deleteCondition.id}`);
        res.status(200);
    } catch (error) {
        console.error("condition not found")
        res.status(404)
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
    