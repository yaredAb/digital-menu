const express = require('express')
const router = express.Router()

const {
    getCategories,
    addCategory,
    updateVisibility
} = require('../controllers/categoryControler')



router.get('/categories', getCategories)

router.post('/categories', addCategory)

module.exports = router