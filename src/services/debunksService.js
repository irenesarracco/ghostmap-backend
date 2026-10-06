const db = require('../datasource/db')

const getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM debunks WHERE id = ?', [id])
  return rows[0]
}

const update = async (id, data) => {
  const fields = []
  const values = []

  if (data.type !== undefined) { fields.push('type = ?'); values.push(data.type) }
  if (data.explanation !== undefined) { fields.push('explanation = ?'); values.push(data.explanation) }
  if (data.link !== undefined) { fields.push('link = ?'); values.push(data.link) }
  if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status) }

  values.push(id)

  const [result] = await db.execute(
    `UPDATE debunks SET ${fields.join(', ')} WHERE id = ?`,
    values
  )
  return result.affectedRows
}

const deleteById = async (id) => {
  const [result] = await db.execute('DELETE FROM debunks WHERE id = ?', [id])
  return result.affectedRows
}

const vote = async (debunkId, userId, isConvincing) => {
  const [result] = await db.execute(
    `INSERT INTO debunk_votes (debunk_id, user_id, is_credible) 
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE is_credible = ?`,
    [debunkId, userId, isConvincing, isConvincing]
  )
  return result
}

module.exports = { getById, update, deleteById, vote }