const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const svgId = req.params.id;

  const id = await db.remove(svgId);

  return res.json({ id });
};
