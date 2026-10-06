const express = require('express')
const router = express.Router()
const sightingsController = require('../controllers/sightingsController')
const authMiddleware = require('../middleware/auth')


router.get('/', sightingsController.getAll)
router.get('/:id', sightingsController.getById)
router.post('/',authMiddleware, sightingsController.create)
router.patch('/:id', authMiddleware,sightingsController.update)
router.delete('/:id', authMiddleware,sightingsController.deleteById)
router.get('/:id/confirmations', sightingsController.getAllConfirmations)
router.post('/:id/confirmations', authMiddleware,sightingsController.createConfirmation)
router.get('/:id/debunks', sightingsController.getAllDebunks)
router.post('/:id/debunks', authMiddleware,sightingsController.createDebunk)

module.exports = router