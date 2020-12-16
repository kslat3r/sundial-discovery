module.exports = (x, peak, peakHour, stdev) => {
  const mean = peakHour * 3600
  const requests = peak / Math.pow(Math.E, (Math.pow(x - mean, 2)) / (2 * stdev * stdev))

  let num = Math.floor(requests)

  if (num === 0) {
    num = 1
  }

  return num
}
