
/*!
 * jss - formats - text
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Output `stats` as plain-text.
 *
 * @param {Object} stats
 * @api private
 */

module.exports = function(files){
  Object.keys(files).forEach(function(file){
    var stats = files[file];
    console.log('\n  \033[90m%s:\033[0m', file);
    Object.keys(stats).forEach(function(name){
      var val = stats[name];
      console.log('    \033[90m%s: \033[36m%s\033[0m', name, val);
    });
  });
  console.log();
};