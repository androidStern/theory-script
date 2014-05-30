goog.require('goog.array');
/*
applyTimes, curry1, curry2, flip, rcurry2, mapWith, isNumber, toNumbers, allNumbers, strWithout, dropLast, endsWith, nthWith, withoutNum, has, partial, first, rest, isEmpty, contains

partial, first, rest, isEmpty, contains

TODO: write test for applyTimes
*/

var allNumbers, applyTimes, arr_equals, checks, complement, compose, contains, curry1, curry2, dropLast, endsWith, first, flip, has, isEmpty, isNaN, isNumber, isReallyNumber, isntNaN, mapWith, nthWith, partial, rcurry2, rest, strWithout, toNumbers, withoutNum, _;

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

curry1 = function(fn) {
  var _unary;
  if (!_.isFunction(fn)) {
    throw new TypeError('Argument of curry1 must be of type function');
  }
  return _unary = function(a) {
    if (a === null) {
      return _unary;
    } else {
      return fn(a);
    }
  };
};

curry2 = function(fn) {
  var _binary;
  if (!_.isFunction(fn)) {
    throw new TypeError('Arguments to curry2 must be of type function');
  }
  return _binary = function(a, b) {
    var al;
    al = arguments.length;
    if (al === 0) {
      return _binary;
    } else if (al === 1) {
      return curry1(function(b) {
        return fn(a, b);
      });
    } else {
      return fn(a, b);
    }
  };
};

flip = function(fn) {
  if (!_.isFunction(fn)) {
    throw new TypeError('Argument to flip must be of type function');
  }
  return function() {
    var args;
    args = 1 <= arguments.length ? goog.array.slice(arguments, 0) : [];
    return fn.apply(null, args.reverse());
  };
};

rcurry2 = function(fn) {
  if (!_.isFunction(fn)) {
    throw new TypeError('Arguments to rcurry2 must be of type function');
  }
  return curry2(flip(fn));
};

mapWith = rcurry2(_.map);

checks = function() {
  var fns;
  fns = 1 <= arguments.length ? goog.array.slice(arguments, 0) : [];
  return function(n) {
    return _.reduce(fns, (function(acc, fn) {
      return fn(n) && acc;
    }), true);
  };
};

complement = function(fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? goog.array.slice(arguments, 0) : [];
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

strWithout = curry2(function(rgx, str) {
  var idx, _rgx;
  if (_.isEmpty(str)) {
    return '';
  }
  if (_.isRegExp(rgx)) {
    _rgx = new RegExp(rgx.source, 'g');
    if (str != null) {
      return str.replace(_rgx, '');
    }
  } else if (_.isString(rgx)) {
    idx = 0;
    while (idx !== -1) {
      str = str.replace(rgx, '');
      idx = str.indexOf(rgx);
    }
    return str;
  }
});

dropLast = function(str, n) {
  if (n == null) {
    n = 1;
  }
  if (_.isArray(n || !_.isNumber(+n))) {
    throw new TypeError('Seccond argument to dropLast must be a number or a quoted number like "1"');
  }
  if (!_.isString(str)) {
    throw new TypeError('First argument to dropLast must be a string');
  }
  return _.first(str, str.length - +n).join('');
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

endsWith = curry2(function(sub, str) {
  var x;
  if (!_.isString(sub) || !_.isString(str)) {
    throw new TypeError('endsWith expects only string arguments');
  }
  str = str.split('');
  sub = sub.split('');
  x = _.last(str, sub.length);
  return arr_equals(x, sub);
});

withoutNum = strWithout(/\d/g);

nthWith = rcurry2(_.nth);

has = _.contains;

partial = _.partial;

first = _.first;

rest = _.rest;

isEmpty = _.isEmpty;

contains = _.contains;

compose = _.compose;

module.exports = {
  "applyTimes": applyTimes,
  "curry1": curry1,
  "curry2": curry2,
  "flip": flip,
  "rcurry2": rcurry2,
  "mapWith": mapWith,
  "isNumber": isNumber,
  "toNumbers": toNumbers,
  "allNumbers": allNumbers,
  "strWithout": strWithout,
  "dropLast": dropLast,
  "endsWith": endsWith,
  "nthWith": nthWith,
  "withoutNum": withoutNum,
  "has": has,
  "partial": partial,
  "first": first,
  "rest": rest,
  "isEmpty": isEmpty,
  "contains": contains,
  "compose": compose
};

/*
//@ sourceMappingURL=utils.js.map
*/