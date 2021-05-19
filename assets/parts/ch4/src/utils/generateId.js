const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateId: () => uuidv4(),
};
