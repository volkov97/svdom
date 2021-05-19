const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const Svg = require('./Svg');

class Database extends EventEmitter {
  constructor() {
    super();

    this.likedIds = {};
    this.idToSvg = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToSvg === 'object') {
      this.idToSvg = {};

      for (let id in dump.idToSvg) {
        const svg = dump.idToSvg[id];

        this.idToSvg[id] = new Svg(svg.id, svg.createdAt);
      }
    }

    if (typeof dump.likedIds === 'object') {
      this.likedIds = { ...dump.likedIds };
    }
  }

  async insert(svg, originalContent) {
    await svg.saveOriginal(originalContent);

    this.idToSvg[svg.id] = svg;

    this.emit('changed');
  }

  setLiked(svgId, value) {
    if (value === false) {
      delete this.likedIds[svgId];
    } else {
      this.likedIds[svgId] = true;
    }

    this.emit('changed');
  }

  async remove(svgId) {
    const svgRaw = this.idToSvg[svgId];

    const svg = new Svg(svgRaw.id, svgRaw.createdAt);

    await svg.removeOriginal();

    delete this.idToSvg[svgId];
    delete this.likedIds[svgId];

    this.emit('changed');

    return svgId;
  }

  findOne(svgId) {
    const svgRaw = this.idToSvg[svgId];

    if (!svgRaw) {
      return null;
    }

    const svg = new Svg(svgRaw.id, svgRaw.createdAt);

    return svg;
  }

  find(isLiked = false) {
    let allSvgs = Object.values(this.idToSvg);

    if (isLiked === true) {
      allSvgs = allSvgs.filter((svg) => this.likedIds[svg.id]);
    }

    allSvgs.sort((svgA, svgB) => svgB.createdAt - svgA.createdAt);

    return allSvgs;
  }

  toJSON() {
    return {
      idToSvg: this.idToSvg,
      likedIds: this.likedIds,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
