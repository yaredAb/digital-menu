const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    ingredients: [String],
    price: Number,
    visible: {
        type: Boolean,
        default: true
    },
    category: String
})

module.exports = mongoose.model('MenuItem', menuItemSchema)