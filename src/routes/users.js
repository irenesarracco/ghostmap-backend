const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/auth')

router.get('/me', authMiddleware, usersController.getMe)
router.patch('/me', authMiddleware, usersController.updateMe)
router.delete('/me', authMiddleware, usersController.deleteMe)
router.get('/:id', usersController.getById)

module.exports = router