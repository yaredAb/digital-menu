const MenuItem = require('../models/MenuItem')

const getMenuItems = async (req, res) => {
    try{
        const menuItems = await MenuItem.find();
        res.json(menuItems)
    } catch (err) {
        res.status(500).json({message: "Error fetching menu items", err})
    }
    
}

const addMenuItem = async (req, res) => {
    console.log('File:', req.file);

  try {
    const { name, description, ingredients, price, category } = req.body;

    console.log('Uploaded file:', req.file);

    // Check required fields
    if (!name || !price || !category || !req.file) {
      return res.status(400).json({ message: 'Name, price, category, and image are required' });
    }

    const image = req.file ? `uploads/${req.file.filename}` : '';

    const newItem = new MenuItem({
      name,
      description: description || '',
      ingredients: ingredients ? ingredients.split(',').map(i => i.trim()) : [],
      category,
      price: parseFloat(price),
      image
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error in addMenuItem:', err);
    res.status(500).json({ message: 'Error adding item', error: err.message });
  }
};

// PATCH visibility
const updateVisibility = async (req, res) => {

    try{
        const { id } = req.params;
        const item = await MenuItem.findById(id)

        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.visible = !item.visible
        await item.save();
        res.json(item)
    } catch(err) {
        res.status(500).json({ message: 'Error updating visibility', error: err.message });

    }
  }

const getMenuItemById = async (req, res) => {

    try{
        const { id } = req.params
        const menuItem = await MenuItem.findById(id)

        if(!menuItem) return res.status(404).json({message: 'Error fetching item'});

        res.json(menuItem)

    } catch(err) {
        res.status(500).json({message: 'error fetching an item'})
    }

    const item = menuItems.find(item => item.id === id);

    if(!item) {
        return res.status(404).json({message: "Item not found"})
    }

    res.json(item)
}
  
  module.exports = {
    getMenuItems,
    addMenuItem,
    updateVisibility,
    getMenuItemById
  };