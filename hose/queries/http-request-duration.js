const range = require('./range');

module.exports = (interval, start, ns) => range(`histogram_quantile(0.95, sum(irate(istio_request_duration_seconds_bucket{destination_service_namespace="${ns}", destination_app=~".*-service"}[${interval}])) by (le, destination_app)) * 1000`, start);
