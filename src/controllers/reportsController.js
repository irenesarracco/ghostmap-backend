const reportsService = require('../services/reportsService')

const create = async (req, res) => {
  try {
    const insertId = await reportsService.create({
      ...req.body,
      user_id: req.userId
    })
    res.status(201).json({ report: { id: insertId } })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { create }