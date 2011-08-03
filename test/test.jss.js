
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