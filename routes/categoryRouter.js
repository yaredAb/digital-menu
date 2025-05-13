const express = require('express')
const router = express.Router()

const {
    getCategories,
    addCategory,
    updateVisibility
} = require('../controllers/categoryControler')



router.get('/', getCategories)

router.post('/', addCategory)

module.exports = router