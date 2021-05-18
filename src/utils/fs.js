const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

module.exports = {
  writeFile: async (path, content) => {
    await writeFileAsync(path, content, { encoding: 'utf-8' });
  },
};
