
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

var stats = jss.stats(fixture('objects.js'));
stats.should.have.property('objectLiterals', 2);
stats.should.have.property('objectsCreated', 1);
