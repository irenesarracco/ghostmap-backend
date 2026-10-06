const express = require('express')
require('dotenv').config()

const sightingsRoutes = require('./src/routes/sightings')
const authRoutes= require('./src/routes/auth')
const categoriesRoutes= require('./src/routes/categories')
const confirmationsRoutes= require('./src/routes/confirmations')
const debunksRoutes = require('./src/routes/debunks')
const usersRoutes = require('./src/routes/users')
const reportsRoutes = require('./src/routes/reports')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1/sightings', sightingsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/confirmations', confirmationsRoutes)
app.use('/api/v1/debunks', debunksRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/reports', reportsRoutes)


app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`)
})
