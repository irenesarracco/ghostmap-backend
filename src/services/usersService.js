const db = require('../datasource/db')

const getById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, username, email, role, reputation, avatar_url, bio, created_at FROM Users WHERE id = ?',
    [id]
  )
  return rows[0]
}

const update = async (id, data) => {
  const fields = []
  const values = []

  if (data.username !== undefined) { fields.push('username = ?'); values.push(data.username) }
  if (data.avatar_url !== undefined) { fields.push('avatar_url = ?'); values.push(data.avatar_url) }
  if (data.bio !== undefined) { fields.push('bio = ?'); values.push(data.bio) }

  values.push(id)

  const [result] = await db.execute(
    `UPDATE Users SET ${fields.join(', ')} WHERE id = ?`,
    values
  )
  return result.affectedRows
}

const deleteById = async (id) => {
  const [result] = await db.execute(
    'UPDATE Users SET is_deleted = 1 WHERE id = ?',
    [id]
  )
  return result.affectedRows
}

module.exports = { getById, update, deleteById }