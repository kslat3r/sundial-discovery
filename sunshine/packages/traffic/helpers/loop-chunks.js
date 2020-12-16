const makeRequests = require('./make-requests')

module.exports = (interval, steps, breakfastChunks, lunchChunks, dinnerChunks) => {
  const increment = interval / steps

  let i = 0
  let total = 0

  makeRequests(breakfastChunks[i], lunchChunks[i], dinnerChunks[i])

  i += 1
  total += increment

  const requestInterval = setInterval(() => {
    makeRequests(breakfastChunks[i], lunchChunks[i], dinnerChunks[i])

    i += 1
    total += increment

    if (total === parseInt(interval)) {
      clearInterval(requestInterval)
    }
  }, increment)
}
