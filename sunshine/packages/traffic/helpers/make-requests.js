module.exports = (breakfastChunks, lunchChunks, dinnerChunks) => {
  breakfastChunks && breakfastChunks.forEach(req => req())
  lunchChunks && lunchChunks.forEach(req => req())
  dinnerChunks && dinnerChunks.forEach(req => req())
}
