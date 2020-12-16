const express = require('express')
const router = express.Router()
const request = require('request-promise')
const createError = require('http-errors')
const fibonacci = require('fibonacci')

const {
  BREAKFAST_SERVICE_HOSTNAME,
  BREAKFAST_SERVICE_PATH,
  LUNCH_SERVICE_HOSTNAME,
  LUNCH_SERVICE_PATH,
  DINNER_SERVICE_HOSTNAME,
  DINNER_SERVICE_PATH
} = process.env

router.get('/recipes/breakfast', async (req, res, next) => {
  let data

  try {
    data = await request({
      uri: `${BREAKFAST_SERVICE_HOSTNAME}${BREAKFAST_SERVICE_PATH}`,
      method: 'GET',
      qs: req.query || {},
      json: true
    })
  } catch (e) {
    next(createError(500, e.message))

    return
  }

  const fib = fibonacci.iterate(process.env.FIBONACCI ? parseInt(process.env.FIBONACCI) : 5000)

  res.send(Object.assign({}, {
    data,
    number: fib.number
  }))
})

router.get('/recipes/lunch', async (req, res, next) => {
  let data

  try {
    data = await request({
      uri: `${LUNCH_SERVICE_HOSTNAME}${LUNCH_SERVICE_PATH}`,
      method: 'GET',
      qs: req.query || {},
      json: true
    })
  } catch (e) {
    next(createError(500, e.message))

    return
  }

  const fib = fibonacci.iterate(process.env.FIBONACCI ? parseInt(process.env.FIBONACCI) : 5000)

  res.send(Object.assign({}, {
    data,
    number: fib.number
  }))
})

router.get('/recipes/dinner', async (req, res, next) => {
  let data

  try {
    data = await request({
      uri: `${DINNER_SERVICE_HOSTNAME}${DINNER_SERVICE_PATH}`,
      method: 'GET',
      qs: req.query || {},
      json: true
    })
  } catch (e) {
    next(createError(500, e.message))

    return
  }

  const fib = fibonacci.iterate(process.env.FIBONACCI ? parseInt(process.env.FIBONACCI) : 5000)

  res.send(Object.assign({}, {
    data,
    number: fib.number
  }))
})

module.exports = router
