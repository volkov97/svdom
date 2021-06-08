const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const svgId = req.params.id;
  const isLiked = req.body.isLiked;

  db.setLiked(svgId, isLiked);

  return res.json(db.findOne(svgId).toPublicJSON());
};
