module.exports = (arr, n) => {
  if (n < 2) {
    return [arr]
  }

  const len = arr.length
  const out = []

  let i = 0

  while (i < len) {
    const size = Math.ceil((len - i) / n--)

    out.push(arr.slice(i, i += size))
  }

  return out
}
