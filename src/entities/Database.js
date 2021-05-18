const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');

const MAX_LATEST_SVG_COUNT = 50;

class Database extends EventEmitter {
  constructor() {
    super();

    this.latestSvgs = [];

    if (existsSync(dbDumpFile)) {
      const dump = require(dbDumpFile);

      if (Array.isArray(dump.latestSvgs)) {
        dump.latestSvgs.forEach((svg) => this.latestSvgs.push(svg));
      }
    }
  }

  insert(svgFile) {
    if (this.latestSvgs.length < MAX_LATEST_SVG_COUNT) {
      this.latestSvgs.push(svgFile);
    } else {
      this.latestSvgs.pop();
      this.latestSvgs.push(svgFile);
    }

    this.emit('changed');

    return;
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
