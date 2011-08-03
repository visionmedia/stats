
/**
 * Module dependencies.
 */

var jss = require('../')
  , should = require('should')
  , fs = require('fs');

jss.should.have.property('version');

// load fixture path

function fixture(path) {
  return fs.readFileSync(__dirname + '/fixtures/' + path, 'utf8');
}

// test simple stats

var stats = jss.stats(fixture('simple.js'));
stats.should.have.property('statements', 4);
stats.should.have.property('assignments', 4);
stats.should.have.property('loc', 9);
stats.should.have.property('bytes', 121);

// test function stats

var stats = jss.stats(fixture('functions.js'));
stats.should.have.property('statements', 6);
stats.should.have.property('assignments', 1);
stats.should.have.property('functions', 3);
