const express = require('express')
const router = express.Router()


const {
    getMenuItems,
    addMenuItem,
    updateVisibility,
    getMenuItemById
} = require('../controllers/menuController');


router.get('/', getMenuItems)

router.post('/', addMenuItem)

router.patch('/:id/visiblity', updateVisibility);

router.get('/:id', getMenuItemById)

module.exports = router