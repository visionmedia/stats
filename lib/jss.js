
/*!
 * jss
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var parse = require('uglify-js').parser.parse;

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Return stats for the given javascript `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.stats = function(str){
  var stats = {
      statements: 0
    , assignments: 0
    , loc: str.split('\n').length
    , bytes: Buffer.byteLength(str)
  };

  function visit(node) {
    if (!node) return;
    var name = node[0];

    // array support
    if ('string' != typeof name) {
      for (var i = 0, len = node.length; i < len; ++i) {
        visit(node[i]);
      }
      return;
    }

    // rename "name" to "ident"
    if ('name' == name) name = 'ident';

    // visit the node
    visit[name](node);
  }

  visit['toplevel'] = function(node){
    visit(node[1]);
  };

  visit['var'] = function(node){
    for (var i = 0, len = node[1].length; i < len; ++i) {
      if (null != node[1][i][1]) ++stats.assignments;
    }
    ++stats.statements;
  };

  visit['binary'] = function(node){
  };

  visit['string'] = function(node){
  };

  visit['ident'] = function(node){
  };

  visit['dot'] = function(node){
  };

  visit['block'] = function(node){
    visit(node[1]);
  };

  visit['while'] = function(node){
    ++stats.statements;
    visit(node[2]);
  };

  visit['if'] = function(node){
    ++stats.statements;
    visit(node[1]);
    visit(node[2]);
    visit(node[3]);
  };

  visit['function'] = function(node){
    visit(node[3]);
  };

  visit['call'] = function(node){
    visit(node[2]);
  };

  visit['assign'] = function(node){
    ++stats.assignments;
    visit(node[3]);
  };

  visit['stat'] = function(node){
    ++stats.statements;
    visit(node[1]);
  };

  visit(parse(str));
  return stats;
};