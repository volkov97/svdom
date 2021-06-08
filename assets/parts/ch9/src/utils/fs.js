const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const unlinkFileAsync = util.promisify(fs.unlink);
const existsFileAsync = util.promisify(fs.exists);

module.exports = {
  writeFile: async (path, content) => {
    await writeFileAsync(path, content, { encoding: 'utf-8' });
  },

  readFile: async (path) => {
    return await readFileAsync(path, 'utf-8');
  },

  removeFile: async (path) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      console.log(`removeFile error: file ${path} doesn't exist...`);
    }
  },

  exists: async (path) => {
    return await existsFileAsync(path);
  },
};
