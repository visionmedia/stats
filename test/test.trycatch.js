
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats('try { "test" } catch (err) { "testing" }');
stats.should.have.property('statements', 3);
stats.should.have.property('strings', 2);
