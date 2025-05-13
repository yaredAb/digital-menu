const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/category.json')

const readCategory = () => {
    const data = fs.readFileSync(dataPath)
    return JSON.parse(data)
}

const writeCategory = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

const getCategories = (req, res) => {
    const categories = readCategory()
    res.json(categories)
}

const addCategory = (req, res) => {
    const {name} = req.body
    const categories = readCategory()

    const newCategory = {
        id: Date.now().toString(),
        name,
        isVisible: true
    }

    categories.push(newCategory)
    writeCategory(categories)
    res.status(201).json(newCategory)
}

// PATCH visibility
const updateVisibility = (req, res) => {
    const { id } = req.params;
    const categories = readCategory();
  
    const item = categories.find(item => item.id === id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
  
    item.visible = !item.isVisible;
    writeMenuData(categories);
    res.json(item);
  }

  module.exports = {
    getCategories,
    addCategory,
    updateVisibility
  }