const express = require('express')
const router = express.Router()


const {
    getMenuItems,
    addMenuItem,
    updateVisibility
} = require('../controllers/menuController');


router.get('/', getMenuItems)

router.post('/', addMenuItem)

router.patch('/:id/visiblity', updateVisibility);

module.exports = router