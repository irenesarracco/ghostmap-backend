const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/reportsController')
const authMiddleware = require('../middleware/auth')

router.post('/', authMiddleware, reportsController.create)

module.exports = router