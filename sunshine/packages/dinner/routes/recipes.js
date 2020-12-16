const express = require('express')
const router = express.Router()
const fibonacci = require('fibonacci')
const data = require('../data/recipes.json')

router.get('/recipes', async (req, res) => {
  const fib = fibonacci.iterate(process.env.FIBONACCI ? parseInt(process.env.FIBONACCI) : 5000)

  res.send(Object.assign({}, {
    data,
    number: fib.number
  }))
})

module.exports = router
