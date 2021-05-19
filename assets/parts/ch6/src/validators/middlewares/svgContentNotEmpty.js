module.exports = (req, res, next) => {
  const content = req.body.content;

  if (!content) {
    return res.sendStatus(400);
  }

  next();
};
