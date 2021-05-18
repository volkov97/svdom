const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const svgId = req.params.id;
  const isLiked = req.body.isLiked;

  db.setBoookmarked(svgId, isLiked);

  return res.json({ isLiked });
};
