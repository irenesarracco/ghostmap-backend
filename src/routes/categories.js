const express = require('express')
const router = express.Router()

const categoriesController= require('../controllers/categoriesController')

router.get('/', categoriesController.getAll)
router.get('/:id', categoriesController.getById)

module.exports = router