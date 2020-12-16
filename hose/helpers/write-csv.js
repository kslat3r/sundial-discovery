const csv = require('fast-csv');
const fs = require('fs');

module.exports = (file, data, headers) => {
  fs.closeSync(fs.openSync(file, 'a'))

  const csvFile = fs.createWriteStream(file, { flags: 'a' });

  if (!headers) {
    csvFile.write('\n');
  }

  csv.writeToStream(csvFile, data, {
    headers
  });
};
