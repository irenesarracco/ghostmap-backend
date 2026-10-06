const usersService = require('../services/usersService')

const getMe = async (req, res) => {
  try {
    const user = await usersService.getById(req.userId)
    if (!user) {
      return res.status(404).json({ error: { code: 404, message: 'Utente non trovato' } })
    }
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const getById = async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: { code: 404, message: 'Utente non trovato' } })
    }
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const updateMe = async (req, res) => {
  try {
    const affectedRows = await usersService.update(req.userId, req.body)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Utente non trovato' } })
    }
    const user = await usersService.getById(req.userId)
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const deleteMe = async (req, res) => {
  try {
    const affectedRows = await usersService.deleteById(req.userId)
    if (affectedRows === 0) {
      return res.status(404).json({ error: { code: 404, message: 'Utente non trovato' } })
    }
    res.json({ message: 'Account eliminato' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { getMe, getById, updateMe, deleteMe }