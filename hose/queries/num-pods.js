const range = require('./range');

module.exports = (start, ns) => range(`count(container_memory_usage_bytes{container_name=~".*-service", namespace="${ns}"}) by (container_name)`, start);
