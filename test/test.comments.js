
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

jss.should.have.property('version');

var stats = jss.stats(fixture('comments.js'));
stats.should.have.property('statements', 0);
stats.should.have.property('loc', 8);
