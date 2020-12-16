require('dotenv').config()

const express = require('express')
const cors = require('cors')
const winston = require('express-winston')
const createError = require('http-errors')
const logger = require('./lib/logger')
const recipesRouter = require('./routes/recipes')

// setup express

const app = express()

app.use(cors())
app.use(winston.logger({ winstonInstance: logger }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1.0', recipesRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.send({ error: err.message })
})

module.exports = app
