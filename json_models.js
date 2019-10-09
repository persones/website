var fs = require('fs');

class Collection {
  constructor(filename) {
    this.docs = JSON.parse(fs.readFileSync(filename));
  }

  findOne(filter, cb) {
    for (let d of this.docs) {
      let match = true;
      for(f in filter) {
        if (filter[f] != d[f]) {
          match = false;
          continue;
        }
      }
      if (match) {
        cb(null, d);
      }
    }
    cb('none found', null);
  }

  find(filter, cb) {
    let res = [];
    for (let d of this.docs) {
      let match = true;
      for(f in filter) {
        if (filter[f] != d[f]) {
          match = false;
          continue;
        }
      }
      if (match) {
        res.push(d);
      }
    }
    cb(null, res);
  }
}

var Project = new Collection(__dirname + '/data/workplaces.json');
var Workplace = new Collection(__dirname + '/data/workplaces.json');

module.exports = {
  Project: Project,
  Workplace: Workplace
}