'use strict';

/* jshint node:true */

/*!
 * stats - find
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var async = require('async');
var dir = require('node-dir');

/**
 * Fire fn for each file in `paths`
 * and callback `fn(err)`.
 *
 * @param {Array} paths
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function(paths, options, fn, callback) {
	async.each(paths, function(path, done) {
		dir.readFiles(path, options, function(err, content, filename, next) {
			if (err) {
				next(err);
			} else {
				fn(content, filename);
				next();
			}
		}, done);
	}, callback);
};