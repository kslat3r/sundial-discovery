const range = require('./range');

module.exports = (interval, start, ns) => range(`sum(rate(istio_requests_total{reporter="destination", destination_service_namespace="${ns}", response_code=~"5.*"}[${interval}])) by (destination_app)`, start);
