const express = require('express')
const router = express.Router()
const multer = require('multer')
const mediaController = require('../controllers/mediaController')
const authMiddleware = require('../middleware/auth')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

router.post('/', authMiddleware, upload.single('file'), mediaController.create)
router.delete('/:id', authMiddleware, mediaController.deleteById)

module.exports = router