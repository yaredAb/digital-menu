const express = require('express')
const router = express.Router()


const {
    getMenuItems,
    addMenuItem,
    updateVisibility,
    getMenuItemById,
} = require('../controllers/menuController');

const upload = require('../middleware/upload')

router.get('/', getMenuItems)

router.post('/', upload.single('image'), addMenuItem)

router.patch('/:id/visiblity', updateVisibility);

router.get('/:id', getMenuItemById)

module.exports = router