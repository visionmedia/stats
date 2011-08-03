
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats('"foo" ? "bar" : "baz"');
stats.should.have.property('statements', 1);
stats.should.have.property('strings', 3);
