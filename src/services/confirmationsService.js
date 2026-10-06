const db = require('../datasource/db')

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM confirmations WHERE id = ?', [id])
  return rows[0]
}

const update = async (id, data) => {
  const fields = []
  const values = []

  if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description) }
  if (data.event_at !== undefined) { fields.push('event_at = ?'); values.push(data.event_at) }
  if (data.lat !== undefined) { fields.push('lat = ?'); values.push(data.lat) }
  if (data.lon !== undefined) { fields.push('lon = ?'); values.push(data.lon) }

  values.push(id)

  const [result] = await db.execute(
    `UPDATE confirmations SET ${fields.join(', ')} WHERE id = ?`,
    values
  )
  return result.affectedRows
}

const deleteById = async (id) => {
  const [result] = await db.execute('DELETE FROM confirmations WHERE id = ?', [id])
  return result.affectedRows
}

module.exports = { getById, update, deleteById }