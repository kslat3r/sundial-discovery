const request = require('request-promise');
const {
  PROMETHEUS_HOST,
  PROMETHEUS_PORT,
  PROMETHEUS_RANGE_QUERY_PATH,
  STEP: step
} = process.env;

module.exports = (query, start = 0, end = (new Date().getTime() / 1000)) => {
  return request({
    method: 'GET',
    uri: `http://${PROMETHEUS_HOST}:${PROMETHEUS_PORT}${PROMETHEUS_RANGE_QUERY_PATH}`,
    qs: {
      query,
      step,
      start,
      end
    },
    json: true
  });
}
