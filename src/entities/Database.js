const path = require('path');
const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile, svgFolder } = require('../config');
const { writeFile, removeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const SvgFile = require('./SvgFile');

const MAX_LATEST_SVG_COUNT = 50;

class Database extends EventEmitter {
  constructor() {
    super();

    this.latestSvgs = [];

    if (existsSync(dbDumpFile)) {
      const dump = require(dbDumpFile);

      if (Array.isArray(dump.latestSvgs)) {
        dump.latestSvgs.forEach((svg) => {
          const svgFile = new SvgFile(svg.id, svg.createdAt);

          svgFile.setContent(svg.content);

          this.latestSvgs.push(svgFile);
        });
      }
    }
  }

  async insert(svgFile) {
    await svgFile.saveOriginal();

    if (this.latestSvgs.length < MAX_LATEST_SVG_COUNT) {
      this.latestSvgs.push(svgFile);
    } else {
      this.latestSvgs.pop();
      this.latestSvgs.push(svgFile);
    }

    this.emit('changed');

    return;
  }

  async remove(svgId) {
    const svgToRemove = this.latestSvgs.find((svgFile) => svgFile.id === svgId);

    if (svgToRemove === undefined) {
      return undefined;
    }

    await removeFile(path.resolve(svgFolder, `${svgId}_original.svg`));

    this.latestSvgs = this.latestSvgs.filter((svgFile) => svgFile.id !== svgId);

    this.emit('changed');

    return svgToRemove;
  }

  toPublicJSON() {
    return {
      latestSvgs: this.latestSvgs,
    };
  }

  toJSON() {
    return {
      latestSvgs: this.latestSvgs,
    };
  }
}

const db = new Database();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
