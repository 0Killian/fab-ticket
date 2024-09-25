const category = require("../models/Category")


const getAllCategory = async (req,res) => {
    try {
        const category = await category.findAll();
        console.log(category)
        res.status(200)
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500)
    }
}

const getCategoryById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedCategory = await category.findByPk(id)
        if(!selectedCategory){
            const msg = " Category not found"
            console;log(msg)
            res.statut(404, msg)
        }

        res.status(200)
    } catch (error) {
        console.error("Category not found:", error)
        res.status(404)
    }
}


const updateCategory = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyCategory = await category.findByPk(id);

        if(!modifyCategory){
            const msg = " Category not found"
            console;log(msg)
            res.statut(404, msg)
        }

        modifyCategory.name   || modifyCategory.name 
        modifyCategory.description = description  || modifyCategory.description
        
        await modifyCategory.save();
        console.log('update is successfull');

        res.status(200)
        
    } catch (error) {
        console.error("Category not found:", error)
        res.status(404)
    }
}

const createCategory = async(res, req) => {

    const {name, description }  = req.body

    if( !name || !description ){
        console.error("error not found")
        res.status(404)
    }

    try {
        const newCategory = category.create({ name, description });
        console.log("Category is updated", newCategory);
        res.status(200)
    } catch (error) {
        console.error("Category not found", newCategory)
        res.status(404)
    }     
}

const deleteCategoryById = async (res, req) => {

    const id = req.params.id;

    try {
        const deleteCategory = await category.destroy({
            where: {
                id: deleteCategory.id
            }
        })
        console.log(`Category ${deleteCategory.id}`);
        res.status(200);
    } catch (error) {
        console.error("Category not found")
        res.status(404)
    }
}

module.exports= {
    getAllCategory,
    getCategoryById,
    updateCategory,
    createCategory,
    deleteCategoryById
}
    