const Category = require('../models/Category')

const getCategories = async (req, res) => {
    try{
        const categories = await Category.find()
        res.json(categories)
    } catch(err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
    
}

const addCategory = async (req, res) => {
    try{
        const {name} = req.body;
        const newCategory = new Category({name})
        await newCategory.save()
        res.status(201).json(newCategory)
    } catch(err) {
        res.status(400).json({ message: 'Error adding category', error: err.message });
    }
}

// PATCH visibility
const updateVisibility = async (req, res) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);

        if(!category) return res.status(404).json({message: "Can\'t proceed the action"});

        category.visible = !category.visible
        await category.save()
        res.json(category)
    } catch(err) {
        res.status(500).json({ message: 'Error updating visibility', error: err.message });
    }
    
  }

  module.exports = {
    getCategories,
    addCategory,
    updateVisibility
  }