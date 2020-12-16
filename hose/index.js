require('dotenv').config();

const {
  DATA_PATH,
  DATA_FILE,
  INTERVAL: interval,
  NAMESPACE: ns
} = process.env;

const queryHttpRequestTotal = require('./queries/http-request-total');
const queryHttpRequestTotalError = require('./queries/http-request-total-error');
const queryHttpRequestDuration = require('./queries/http-request-duration');
const querySumContainerCpuUsage = require('./queries/sum-container-cpu-usage');
const querySumContainerMemoryUsage = require('./queries/sum-container-memory-usage');
const queryAvgContainerCpuUsage = require('./queries/avg-container-cpu-usage');
const queryAvgContainerMemoryUsage = require('./queries/avg-container-memory-usage');
const queryNumPods = require('./queries/num-pods');
const getMergedData = require('./helpers/get-merged-data');
const writeCsv = require('./helpers/write-csv');

const dataFile = `${DATA_PATH}/${new Date().getTime()}-${DATA_FILE}`;
const queryInterval = `${interval / 1000}s`;
let start = Math.floor((new Date().getTime() - interval) / 1000);

const go = async (headers = false) => {
  const promises = [
    queryHttpRequestTotal(queryInterval, start, ns),
    queryHttpRequestTotalError(queryInterval, start, ns),
    queryHttpRequestDuration(queryInterval, start, ns),
    querySumContainerCpuUsage(queryInterval, start, ns),
    querySumContainerMemoryUsage(start, ns),
    queryAvgContainerCpuUsage(queryInterval, start, ns),
    queryAvgContainerMemoryUsage(start, ns),
    queryNumPods(start, ns)
  ];

  const responses = await Promise.all(promises);

  const [
    httpRequestTotal,
    httpRequestTotalError,
    httpRequestDuration,
    sumContainerCpuUsage,
    sumContainerMemoryUsage,
    avgContainerCpuUsage,
    avgContainerMemoryUsage,
    numPods
  ] = responses;

  const data = getMergedData(headers, httpRequestTotal, httpRequestTotalError, httpRequestDuration, sumContainerCpuUsage, sumContainerMemoryUsage, avgContainerCpuUsage, avgContainerMemoryUsage, numPods);

  writeCsv(dataFile, data, headers);

  start = data[data.length - 1][0] + 1;
};

go(true);
setInterval(go, interval);
