const db = require('../../entities/Database');
const Svg = require('../../entities/Svg');

module.exports = async (req, res) => {
  const { content } = req.body;

  const svgFile = new Svg();

  await db.insert(svgFile, content);

  return res.json(svgFile.toPublicJSON());
};
