
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('arrays.js'));
stats.should.have.property('arrayLiterals', 2);
stats.should.have.property('strings', 6);
