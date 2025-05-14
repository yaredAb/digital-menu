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

    try{
        const {name, description, ingredients, price, category} = req.body
        const image = req.file ? `uploads/${req.file.filename}` : null

        if(!image) {
            return res.status(400).json({message: 'image is required'})
        }
        const newItem = new MenuItem({
            name,
            image,
            description,
            ingredients,
            price,
            category,
            image
            }
        )
        await newItem.save();
        res.status(201).json(newItem)
    } catch (err) {
        console.error('Error in addMenuItem:', err);
        res.status(400).json({ message: 'Error adding item', error: err.message });
    }
}

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