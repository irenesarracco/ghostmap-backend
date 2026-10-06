const express = require('express')
const router = express.Router()
const debunksController = require('../controllers/debunksController')
const authMiddleware = require('../middleware/auth')

router.get('/:id', debunksController.getById)
router.patch('/:id', authMiddleware, debunksController.update)
router.delete('/:id', authMiddleware, debunksController.deleteById)
router.put('/:id/votes', authMiddleware, debunksController.vote)

module.exports = router