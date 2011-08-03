
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('with.js'));
stats.should.have.property('statements', 3);
