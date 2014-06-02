var allNumbers, applyTimes, arr_equals, binary, checks, complement, curry, curry2, flip, isNaN, isNumber, isReallyNumber, isntNaN, mapWith, ncurry, partial, toNumbers, _, _ref,
  __slice = [].slice;

_ref = require("fn-utils"), ncurry = _ref.ncurry, curry = _ref.curry, partial = _ref.partial, flip = _ref.flip, curry2 = _ref.curry2, binary = _ref.binary;

mapWith = require('flipped').mapWith;

/*
applyTimes, isNumber, toNumbers, allNumbers, strWithout, dropLast, endsWith, nthWith, withoutNum
TODO: write test for applyTimes
*/


_ = require('lodash-contrib');

applyTimes = function(fn) {
  return function(val, n) {
    var _i, _results;
    return _.reduce((function() {
      _results = [];
      for (var _i = 1; 1 <= n ? _i <= n : _i >= n; 1 <= n ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), (function(acc) {
      return fn(acc);
    }), val);
  };
};

isNumber = function(value) {
  return typeof value === 'number' || value && typeof value === 'object' && toString.call(value) === '[object Number]' || false;
};

isNaN = function(value) {
  return isNumber(value) && value !== +value;
};

checks = function() {
  var fns;
  fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return function(n) {
    return _.reduce(fns, (function(acc, fn) {
      return fn(n) && acc;
    }), true);
  };
};

complement = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return !fn.apply(null, args);
  };
};

isntNaN = complement(isNaN);

isReallyNumber = function(n) {
  return isNumber(n) && !isNaN(n);
};

toNumbers = mapWith(function(val) {
  return +val;
});

allNumbers = function(n) {
  if (_.isEmpty(n)) {
    return false;
  }
  return _.all(toNumbers(n), isReallyNumber);
};

arr_equals = function(a, b) {
  var i, v, _i, _len;
  if (a.length !== b.length) {
    return false;
  }
  for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
    v = a[i];
    if (v !== b[i]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  "applyTimes": applyTimes,
  "isNumber": isNumber,
  "toNumbers": toNumbers,
  "allNumbers": allNumbers
};

/*
//@ sourceMappingURL=utils.js.map
*/