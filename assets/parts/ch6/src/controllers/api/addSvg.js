const db = require('../../entities/Database');
const Svg = require('../../entities/Svg');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new BadRequestApiError('SVG content should not be empty');
    }

    const svgFile = new Svg();

    await db.insert(svgFile, content);

    return res.json(svgFile.toPublicJSON());
  } catch (err) {
    return next(err);
  }
};
