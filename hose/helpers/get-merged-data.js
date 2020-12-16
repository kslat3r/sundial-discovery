const debug = require('./debug');
const map = require('./map');

module.exports = (headers, httpRequestTotal, httpRequestTotalError, httpRequestDuration, sumContainerCpuUsage, sumContainerMemoryUsage, avgContainerCpuUsage, avgContainerMemoryUsage, numPods) => {
  // debug('HTTP request total', httpRequestTotal);
  // debug('HTTP request total error', httpRequestTotalError);
  // debug('HTTP request duration', httpRequestDuration);
  // debug('Sum container CPU usage', sumContainerCpuUsage);
  // debug('Sum container memory usage', sumContainerMemoryUsage);
  // debug('Avg container CPU usage', avgContainerCpuUsage);
  // debug('Avg container memory usage', avgContainerMemoryUsage);
  // debug('Number of pods', numPods);

  const records = [];

  if (headers) {
    records.push([
      'unixTime',
      'containerName',
      'httpRequestTotal',
      'httpRequestTotalError',
      'httpRequestDuration',
      'sumContainerCpuUsage',
      'sumContainerMemoryUsage',
      'avgContainerCpuUsage',
      'avgContainerMemoryUsage',
      'numPods'
    ]);
  }

  const unixTimes = httpRequestTotal.data.result[0].values.map(value => value[0]);
  const containerNames = httpRequestTotal.data.result.map(result => result.metric.destination_app);

  unixTimes.forEach(unixTime => {
    containerNames.forEach(containerName => {
      const record = [unixTime, containerName];

      record.push(map(httpRequestTotal, unixTime, containerName, 'destination_app', 0));
      record.push(map(httpRequestTotalError, unixTime, containerName, 'destination_app', 0));
      record.push(map(httpRequestDuration, unixTime, containerName, 'destination_app', null));
      record.push(map(sumContainerCpuUsage, unixTime, containerName, 'container_name', null));
      record.push(map(sumContainerMemoryUsage, unixTime, containerName, 'container_name', null));
      record.push(map(avgContainerCpuUsage, unixTime, containerName, 'container_name', null));
      record.push(map(avgContainerMemoryUsage, unixTime, containerName, 'container_name', null));
      record.push(map(numPods, unixTime, containerName, 'container_name', 0));

      records.push(record);
    });
  });

  return records;
};
