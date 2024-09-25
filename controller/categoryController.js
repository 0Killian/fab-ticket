const category = require("../models/Category")


const getAllCategory = async (req,res) => {
    try {
        const category = await category.findAll();
        console.log(category)
        res.status(200).json("get all category")
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500).json("not founnd", error)
    }
}

const getCategoryById = async (req,res) => {
    try {
        const id = req.params.id;
        const selectedCategory = await category.findByPk(id)
        if(!selectedCategory){
            const msg = " Category not found"
            console;log(msg)
            res.status(404, msg)
        }

        res.status(200).json(`find id: ${id}`)
    } catch (error) {
        console.error("Category not found:", error)
        res.status(404).json("not found")
    }
}


const updateCategory = async(res, req) =>{
    try {
        const id = req.params.id;
        const modifyCategory = await category.findByPk(id);

        if(!modifyCategory){
            const msg = " Category not found"
            console;log(msg)
            res.status(404, msg)
        }

        modifyCategory.name = req.body.name  || modifyCategory.name 
        modifyCategory.description = req.body.description  || modifyCategory.description
        
        await modifyCategory.save();
        console.log('update is successfull');

        res.status(200).json('catégory is updated')
        
    } catch (error) {
        console.error("Category not found:", error)
        res.status(404).json("not found")
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
        res.status(200).json("catagory is created")
    } catch (error) {
        console.error("Category not found", newCategory)
        res.status(404).json("not found")
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
        console.log(`Category ${id}`);
        res.status(200).json(`Category ${id} is deleted`)
    } catch (error) {
        console.error("Category not found")
        res.status(404).json("not found")
    }
}

module.exports= {
    getAllCategory,
    getCategoryById,
    updateCategory,
    createCategory,
    deleteCategoryById
}
    