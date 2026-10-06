const debunksService = require('../services/debunksService')

const getById = async (req, res) => {
  try {
    const debunk = await debunksService.getById(req.params.id)
    if (!debunk) {
      return res.status(404).json({ error: { code: 404, message: 'Smentita non trovata' } })
    }
    res.json({ debunk })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const update = async (req, res) => {
  try {
    const affectedRows = await debunksService.update(req.params.id, req.body)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Smentita non trovata' } })
    }
    const debunk = await debunksService.getById(req.params.id)
    res.json({ debunk })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const deleteById = async (req, res) => {
  try {
    const affectedRows = await debunksService.deleteById(req.params.id)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Smentita non trovata' } })
    }
    res.json({ message: 'Smentita eliminata' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const vote = async (req, res) => {
  try {
    await debunksService.vote(req.params.id, req.userId, req.body.isConvincing)
    res.json({ message: 'Voto registrato' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { getById, update, deleteById, vote }