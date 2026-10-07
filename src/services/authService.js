const db= require('../datasource/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register= async(data)=> {
    const password_hash= await bcrypt.hash(data.password, 10)
    const [result]= await db.execute(
        `INSERT INTO Users
        (username, email, password)
        VALUES(?,?,?)`,
        [data.username, data.email, password_hash]
        
    )
    return result.insertId
}

const login = async(email, password)=> {
    const [rows]= await db.execute(
        'SELECT * FROM Users WHERE email= ?', [email]
    )
    const user= rows[0]
    if(!user){
        throw new Error('Credenziali non valide')
    }
    const isValid= bcrypt.compare(password, user.password)
    if(!isValid){
        throw new Error('Credenziali non valide')    }


  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  await db.execute(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [user.id, refreshToken, expiresAt]
  )
    return { accessToken, refreshToken, user: { id: user.id, username: user.username, email: user.email, role: user.role } }

}

  const refresh = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

  const [rows] = await db.execute(
    'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
    [refreshToken]
  )

  if (!rows[0]) throw new Error('Refresh token non valido')

  const accessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  return { accessToken }
}  


const me = async (userId) => {
  const [rows] = await db.execute(
    'SELECT id, username, email, role, reputation FROM Users WHERE id = ?',
    [userId]
  )
  return rows[0]
}

const logout = async (refreshToken) => {
  await db.execute('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken])
}

module.exports = { register, login, me, refresh, logout }