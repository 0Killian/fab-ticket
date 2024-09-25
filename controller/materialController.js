const Material = require("../models/Material")
const condition = require("../models/Condition")


const getAllMaterial = async (req,res) => {
    try {
        const materials = await Material.findAll();
        console.log(materials);
        res.status(200).json('get all matérials');
    } catch (error) {
        console.error("error to get matérial list:", error)
        res.status(402).json("error to get matérial list:")
    }
}

const getMaterialById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedMaterial = await Material.findByPk(id)

        if(!selectedMaterial){
            const msg = "material not found"
            console;log(msg)
            res.status(404, msg)
        }
        res.status(200).json(`material ${id}`)
    } catch (error) {
        console.error("Material not found:", error)
        res.status(404).json("not found")
    }
}

const updateMaterial = async(res, req) =>{

    try {
        const id = req.params.id;
        const modifyMaterial = await Material.findByPk(id);

        if(!modifyMaterial){
            const msg = " material not found"
            console;log(msg)
            res.status(404, msg)
        }

        modifyMaterial.inventoryId = req.body.inventoryId  || modifyMaterial.inventoryId  
        modifyMaterial.description = req.body.description  || modifyMaterial.description  
        modifyMaterial.categoryId = req.body.ategoryId  || modifyMaterial.categoryId  
        modifyMaterial.inventoryId = req.body.photo  || modifyMaterial.photo  
        modifyMaterial.inventoryId = req.body.buyDate  || modifyMaterial.buyDate  
        modifyMaterial.inventoryId = req.body.conditionId  || modifyMaterial.conditionId  
        
        await selectedMaterial.save();
        console.log('update is successfull');

        res.status(200).json('update is successfull')
        
    } catch (error) {
        console.error("Material not found:", error)
        res.status(404).json("not found")
    }
}

const createMaterial = async(res, req) => {

    const {inventoryId, description, categoryId, photo, buyDate, conditionId }  = req.body

    if( !inventoryId || !description || !categoryId || !photo || !buyDate | !conditionId ){
        console.error("error not found")
        res.status(404).json('error not found')
    }

    try {
        const newMaterial = Material.create({ inventoryId, description, categoryId, photo, buyDate, conditionId });
        console.log("Material is updated", newMaterial);
        res.status(200).json("Material is updated")
    } catch (error) {
        console.error("Material not found", newMaterial)
        res.status(404).json("material not found")
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
        res.status(200).json("get all condition")
    } catch (error) {
        console.error("error to get ", error)
        res.status(500).json("error to get ")
    }
}


const getConditionById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedCondition = await condition.findByPk(id)

        if(!selectedCondition){
            const msg = " condition not found"
            console;log(msg)
            res.status(404, msg)
        }

        res.status(200).json(`condition ${id}`)
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404).json("id not found")
    }
}


const updateCondition = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyCondition = await condition.findByPk(id);

        const {name, description }  = req.body

        if(!modifyCondition){
            const msg = " condition not found"
            console;log(msg)
            res.status(404, msg)
        }

        modifyCondition.name = name  || modifyCondition.name
        modifyCondition.description = description  || modifyCondition.description  
        
        await modifyCondition.save();
        console.log('update is successfull');

        res.status(200).json("successfull")
        
    } catch (error) {
        console.error("condition not found:", error)
        res.status(404).json("condition not found:")
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
        res.status(200).json("condition is updated")
    } catch (error) {
        console.error("condition not found", newCondition)
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
    