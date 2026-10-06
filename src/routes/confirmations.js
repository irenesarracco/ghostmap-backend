const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const confirmationsController= require('../controllers/confirmationsController')

router.get('/:id', confirmationsController.getById)
router.patch('/:id', authMiddleware, confirmationsController.update)
router.delete('/:id', authMiddleware, confirmationsController.deleteById)

module.exports = router