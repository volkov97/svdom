const path = require('path');
const { optimize } = require('svgo');

const { svgFolder } = require('../../config');
const { exists, readFile } = require('../../utils/fs');
const {
  BadRequestApiError,
  NotFoundApiError,
} = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (!filename || filename.includes('.svg') === false) {
      throw new BadRequestApiError(
        'Filename should be provided and end with .svg'
      );
    }

    const pathToFile = path.resolve(svgFolder, filename);
    const isFileExists = await exists(pathToFile);

    if (isFileExists === false) {
      throw new NotFoundApiError('SVG file not found');
    }

    const svgString = await readFile(pathToFile);

    const result = optimize(svgString);

    return res.attachment(`compressed_${filename}`).send(result.data);
  } catch (err) {
    next(err);
  }
};
