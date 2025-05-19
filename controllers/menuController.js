const MenuItem = require('../models/MenuItem')
const cloudinary = require('../utils/cloudinary')

const getMenuItems = async (req, res) => {
    try{
        const menuItems = await MenuItem.find().sort({createdAt: -1});
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

    const image = req.file?.path;
    console.log('Cloudinary URL:', req.file?.path); // should be a public image URL

    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    const newItem = new MenuItem({
      name,
      description: description || '',
      ingredients: ingredients || '',
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

const deleteMenu = async (req, res) => {
  try{
    const {id} = req.params

    const menuItem = await MenuItem.findById(id)

    if(!menuItem) return res.status(404).json({message: "Item not found"});

    if(menuItem.image) {
      const publicId = menuItem.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(publicId)
    }

    await MenuItem.findByIdAndDelete(id)

    res.status(200).json({message: "deleted successfully"})
  } catch(err) {
    console.error('Error in deleteMenuItem:', err);
    res.status(500).json({ message: 'Error deleting menu item', error: err.message });
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

const updateMenuItem = async (req, res) => {
  try{
    const {id} = req.params
    const {name, description, price, ingredients, category} = req.body

    const menuItem = await MenuItem.findById(id)
    if(!menuItem) {
      return res.status(404).json({message: 'Item not found'})
    }

    if(req.file && menuItem.image) {
      const publicId = menuItem.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`menu-items/${publicId}`)
    }

    menuItem.name = name;
    menuItem.description = description || '';
    menuItem.price = parseFloat(price);
    menuItem.ingredients = ingredients;
    menuItem.category = category;

    if(req.file?.path) {
      menuItem.image = req.file.path
    }

    await menuItem.save()

    res.status(200).json(menuItem)
  } catch (err) {
    console.error('Error updating menu item', err)
    res.status(500).json({message: 'Error updating an item', error: err.message})
  }
}
  
  module.exports = {
    getMenuItems,
    addMenuItem,
    updateVisibility,
    getMenuItemById,
    deleteMenu,
    updateMenuItem
  };