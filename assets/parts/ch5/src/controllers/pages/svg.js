const db = require('../../entities/Database');

module.exports = (req, res) => {
  const svgId = req.params.id;

  const svg = db.findOne(svgId).toPublicJSON();

  return res.render('svg', { svg });
};
