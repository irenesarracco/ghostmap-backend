const confirmationsService = require('../services/confirmationsService')

const getById = async (req, res) => {
  try {
    const confirmation = await confirmationsService.getById(req.params.id)
    if (!confirmation) {
      return res.status(404).json({ error: { code: 404, message: 'Conferma non trovata' } })
    }
    res.json({ confirmation })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const update = async (req, res) => {
  try {
    const affectedRows = await confirmationsService.update(req.params.id, req.body)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Conferma non trovata' } })
    }
    const confirmation = await confirmationsService.getById(req.params.id)
    res.json({ confirmation })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const deleteById = async (req, res) => {
  try {
    const affectedRows = await confirmationsService.deleteById(req.params.id)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Conferma non trovata' } })
    }
    res.json({ message: 'Conferma eliminata' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { getById, update, deleteById }