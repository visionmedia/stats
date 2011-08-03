
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('functions.js'));
stats.should.have.property('statements', 6);
stats.should.have.property('assignments', 1);
stats.should.have.property('functions', 3);
