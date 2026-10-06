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


const token= jwt.sign(
    {userId: user.id, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN}

    )
    return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } }
}

const me = async (userId) => {
  const [rows] = await db.execute(
    'SELECT id, username, email, role, reputation FROM Users WHERE id = ?',
    [userId]
  )
  return rows[0]
}

module.exports = { register, login, me }