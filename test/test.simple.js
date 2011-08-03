
/**
 * Module dependencies.
 */

var jss = require('../')
  , scommon = require('./common');

jss.should.have.property('version');

var stats = jss.stats(fixture('simple.js'));
stats.should.have.property('statements', 4);
stats.should.have.property('assignments', 4);
stats.should.have.property('loc', 9);
stats.should.have.property('bytes', 121);
