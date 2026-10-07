const mediaService = require('../services/mediaService')
const path = require('path')

const create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { code: 400, message: 'Nessun file caricato' } })
    }

    let type = 'photo'
    if (req.file.mimetype.startsWith('video')) type = 'video'
    if (req.file.mimetype.startsWith('audio')) type = 'audio'

    const insertId = await mediaService.create({
      type,
      file_url: req.file.path,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      user_id: req.userId,
      sighting_id: req.body.sightingId || null,
      confirmation_id: req.body.confirmationId || null,
      debunk_id: req.body.debunkId || null
    })

    res.status(201).json({ media: { id: insertId, file_url: req.file.path } })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const deleteById = async (req, res) => {
  try {
    const affectedRows = await mediaService.deleteById(req.params.id)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Media non trovato' } })
    }
    res.json({ message: 'Media eliminato' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { create, deleteById }