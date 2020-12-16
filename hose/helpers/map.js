module.exports = (response, unixTime, containerName, containerPropName, defaultValue) => {
  const result = response.data.result.find(result => result.metric[containerPropName] === containerName);

  if (!result) {
    return defaultValue;
  }

  const values = result.values;
  const value = values.find(value => value[0] === unixTime);

  if (!value || !value[1]) {
    return defaultValue;
  }

  return value[1];
};
