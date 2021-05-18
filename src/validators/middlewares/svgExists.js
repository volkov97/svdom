const db = require('../../entities/Database');

module.exports = (req, res, next) => {
  const svgId = req.params.id;

  if (db.findOne(svgId) === null) {
    return res.sendStatus(400);
  }

  next();
};
