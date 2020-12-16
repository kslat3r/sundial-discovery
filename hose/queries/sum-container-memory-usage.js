const range = require('./range');

module.exports = (start, ns) => range(`sum(container_memory_usage_bytes{namespace="${ns}", container_name=~".*-service"}) by (container_name)`, start);
