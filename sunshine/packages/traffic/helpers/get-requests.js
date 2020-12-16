const request = require('request-promise')
const {
  INGRESS_HOST: ingressHost,
  INGRESS_PORT: ingressPort
} = process.env

module.exports = (path, numRequests) => {
  const url = `http://${ingressHost}:${ingressPort}/api/v1.0/recipes/${path}`
  const requests = []

  for (let i = 0; i < numRequests; i++) {
    requests.push(() => request({
      uri: url,
      timeout: 30000
    }))
  }

  return requests
}
