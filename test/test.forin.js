
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats('for (var key in val) "hey";');
stats.should.have.property('statements', 2);
stats.should.have.property('strings', 1);
