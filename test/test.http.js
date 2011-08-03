
/**
 * Module dependencies.
 */

var jss = require('../')
  , common = require('./common');

jss.should.have.property('version');

var stats = jss.stats(fixture('http.js'));
stats.should.have.property('strings', 4);
stats.should.have.property('numbers', 1);
stats.should.have.property('statements', 4);
stats.should.have.property('assignments', 1);
stats.should.have.property('stringBytes', 38);
stats.should.have.property('loc', 11);
