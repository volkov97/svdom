const db = require('../../entities/Database');

module.exports = (req, res) => {
  const allSvgs = db.find().map((svg) => svg.toPublicJSON());
  const likedSvgs = db.find(true).map((svg) => svg.toPublicJSON());

  return res.json({ allSvgs, likedSvgs });
};
