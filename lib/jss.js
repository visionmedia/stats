
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
    , functions: 0
    , numbers: 0
    , strings: 0
    , stringBytes: 0
    , objectLiterals: 0
    , objectsCreated: 0
    , throws: 0
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
    if (!visit[name]) throw new Error('no visitor implemented for "' + name + '"');
    visit[name](node);
  }

  visit['toplevel'] = function(node){
    visit(node[1]);
  };

  visit['object'] = function(node){
    ++stats.objectLiterals;
    node[1].forEach(function(pair){
      visit(pair[1]);
    });
  };

  visit['var'] = function(node){
    node[1].forEach(function(node){
      if (node[1]) ++stats.assignments;
      visit(node[1]);
    });
    ++stats.statements;
  };

  visit['num'] = function(node){
    ++stats.numbers;
  };

  visit['return'] = function(node){};

  visit['unary-prefix'] = function(node){};

  visit['binary'] = function(node){};

  visit['ident'] = function(node){};

  visit['new'] = function(node){
    ++stats.objectsCreated;
    visit(node[1]);
    visit(node[2]);
  };

  visit['throw'] = function(node){
    ++stats.throws;
    visit(node[1]);
  };

  visit['for'] = function(node){
    visit(node[1]);
    visit(node[2]);
    visit(node[3]);
    visit(node[4]);
  };

  visit['sub'] = function(node){
    visit(node[1]);
    visit(node[2]);
  };

  visit['string'] = function(node){
    ++stats.strings;
    stats.stringBytes += Buffer.byteLength(node[1]);
  };

  visit['dot'] = function(node){
    visit(node[1]);
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

  visit['defun'] = function(node){
    ++stats.functions;
    ++stats.statements;
    visit(node[3]);
  };

  visit['function'] = function(node){
    ++stats.functions;
    visit(node[3]);
  };

  visit['call'] = function(node){
    visit(node[1]);
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