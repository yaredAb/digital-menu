const express = require('express')
const router = express.Router()


const {
    getMenuItems,
    addMenuItem,
    updateVisibility,
    getMenuItemById,
    deleteMenu,
    updateMenuItem
} = require('../controllers/menuController');

const upload = require('../middleware/cloudinaryUpload')

router.get('/', getMenuItems)

router.post('/', upload.single('image'), addMenuItem)

router.patch('/:id/visibility', updateVisibility);

router.delete('/:id', deleteMenu)

router.get('/:id', getMenuItemById)

router.put('/:id', upload.single('image'), updateMenuItem)

module.exports = router