const range = require('./range');

module.exports = (interval, start, ns) => range(`rate(istio_requests_total{reporter="destination", destination_service_namespace="${ns}", response_code="200"}[${interval}])`, start);
