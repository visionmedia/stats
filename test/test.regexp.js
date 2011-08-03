
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats('foo.text(/something/)');
stats.should.have.property('statements', 1);
stats.should.have.property('regexpLiterals', 1);
