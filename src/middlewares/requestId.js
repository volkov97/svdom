const { generateId } = require('../utils/generateId');

const REQUEST_ID_HEADER_NAME = 'X-Request-Id';

module.exports = (req, res, next) => {
  const requestIdHeader = req.headers[REQUEST_ID_HEADER_NAME.toLowerCase()];

  req.id = requestIdHeader || generateId();

  res.setHeader(REQUEST_ID_HEADER_NAME, req.id);

  next();
};
