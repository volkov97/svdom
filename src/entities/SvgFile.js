const path = require('path');

const { svgFolder } = require('../config');
const { writeFile } = require('../utils/fs');
const { generateId } = require('../utils/generateId');

module.exports = class SvgFile {
  constructor() {
    this.id = generateId();
    this.createdAt = Date.now();

    this.originalContent = null;
  }

  setContent(content) {
    this.originalContent = content;
  }

  async saveOriginal() {
    await writeFile(
      path.resolve(svgFolder, `${this.id}_original.svg`),
      this.originalContent
    );
  }

  toJSON() {
    return {
      id: this.id,
      originalUrl: `/files/${this.id}_original.svg`,
      createdAt: this.createdAt,
    };
  }
};
