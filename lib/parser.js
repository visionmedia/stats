'use strict';

/* jslint node:true */

var esprima = require('esprima');

var keys = {
    Punctuator: {
        '[': 'arrayLiterals',
        '=': 'assignments'
    },
    Keyword: {
        'function': 'functions',
        'throw': 'throws',
        'new': 'objectsCreated'
    },
    Numeric: 'numbers',
    String: 'strings',
    RegularExpression: 'regexpLiterals'
};

function createHistogram() {
    var obj = {};
    for (var key in keys) {
        var k = keys[key];
        if (typeof k === 'string') {
            obj[k] = 0;
        } else {
            for (var _key in k) {
                obj[k[_key]] = 0;
            }
        }
    }
    obj.stringBytes = 0;
    obj.objectLiterals = 0;
    return obj;
}

function processNode(node, histogram) {
    if (node && node.type) {
        if (node.type.indexOf('Statement') !== -1) {
            histogram.statements++;
        }
        if (node.type.indexOf('ObjectExpression') !== -1) {
            histogram.objectLiterals++;
        }
    }
}

function traverse(o, histogram) {
    for (var i in o) {
        if (typeof(o[i]) == "object" && i !== 'handler') {
            processNode(o[i], histogram);
            traverse(o[i], histogram);
        }
    }
}

module.exports = function(content) {
    var histogram = createHistogram();
    content = content.replace('#!/usr/bin/env node\n', '');
    var parsed = esprima.parse(content, {
        tokens: true
    });
    histogram.statements = 0;
    traverse(parsed, histogram);
    parsed.tokens.forEach(function(token) {
        if (keys.hasOwnProperty(token.type)) {
            var key = keys[token.type];
            if (typeof key === 'object' && keys[token.type].hasOwnProperty(token.value)) {
                histogram[keys[token.type][token.value]] ++;
            }
            if (typeof key === 'string') {
                histogram[keys[token.type]] ++;
            }
            if (token.type === 'String') {
                histogram.stringBytes += Buffer.byteLength(token.value);
            }
        }
    });
    histogram.loc = content.split('\n').length;
    histogram.bytes = Buffer.byteLength(content);
    return histogram;
};