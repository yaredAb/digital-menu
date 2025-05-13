const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/menuItems.json')

const readMenuData = () => {
    const data = fs.readFileSync(dataPath)
    return JSON.parse(data)
}

const writeMenuData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

const getMenuItems = (req, res) => {
    const menuItems = readMenuData();
    res.json(menuItems)
}

const addMenuItem = (req, res) => {
    const {name, image, description, ingredients} = req.body
    const menuItems = readMenuData()

    const newItem = {
        id: Date.now().toString(),
        name,
        image,
        description,
        ingredients,
        price,
        visible: true
    };

    menuItems.push(newItem)
    writeMenuData(menuItems)
    res.status(201).json(newItem)
}

// PATCH visibility
const updateVisibility = (req, res) => {
    const { id } = req.params;
    const menuItems = readMenuData();
  
    const item = menuItems.find(item => item.id === id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
  
    item.visible = !item.visible;
    writeMenuData(menuItems);
    res.json(item);
  }

const getMenuItemById = (req, res) => {
    const { id } = req.params
    const menuItems = readMenuData()

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