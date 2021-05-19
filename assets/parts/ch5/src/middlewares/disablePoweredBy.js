module.exports = (req, res, next) => {
  res.removeHeader('X-Powered-By');

  next();
};
