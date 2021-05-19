const { ApiError } = require('../validators/errors/ApiError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log(err.message);

  if (err instanceof ApiError) {
    return err.sendResponse(res);
  }

  return res.status(500).json({ message: err.message });
};
