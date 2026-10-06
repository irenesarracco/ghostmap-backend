const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: { code: 401, message: 'Token mancante' } })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId
    req.userRole = decoded.role

    next()
  } catch (error) {
    res.status(401).json({ error: { code: 401, message: 'Token non valido' } })
  }
}

module.exports = authMiddleware