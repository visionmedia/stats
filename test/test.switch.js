
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('switch.js'));
stats.should.have.property('statements', 5);
