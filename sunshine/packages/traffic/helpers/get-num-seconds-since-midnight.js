module.exports = () => {
  const now = new Date()
  const then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

  return (now.getTime() - then.getTime()) / 1000
}
