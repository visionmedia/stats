
/*!
 * jss - find
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , join = path.join
  , extname = path.extname
  , noop = function(){};

/**
 * Find JavaScript files by the given `paths`
 * and callback `fn(err, files)`.
 *
 * @param {Array} paths
 * @param {Function} fn
 * @api public
 */

module.exports = function(paths, fn){
  var pending = paths.length
    , ret = [];
  paths.forEach(function(path){
    fs.readdir(path, function(err, files){
      if (err) {
        fn(err);
        fn = noop;
        return
      }

      files = files.filter(javascript).map(function(file){
        return join(path, file);
      });

      ret = ret.concat(files);
      --pending || fn(null, ret);
    });
  });
};

/**
 * Filter `file` by ".js" extension.
 *
 * @param {String} file
 * @return {Boolean}
 * @api private
 */

function javascript(file) {
  return '.js' == extname(file);
}