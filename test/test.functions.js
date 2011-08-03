
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('functions.js'));
stats.should.have.property('statements', 10);
stats.should.have.property('assignments', 2);
stats.should.have.property('functions', 4);
