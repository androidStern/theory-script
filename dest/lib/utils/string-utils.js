var capitalize, curry2, dropLast, endsWith, without, withoutNum, _;

_ = require('lodash');

curry2 = require('fn-utils').curry2;

capitalize = function(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

without = curry2(function(rgx, str) {
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

withoutNum = without(/\d/g);

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

dropLast = function(str, n) {
  if (n == null) {
    n = 1;
  }
  if (!_.isNumber(+n)) {
    throw new TypeError('Seccond argument to dropLast must be a number or a quoted number like "1"');
  }
  if (!_.isString(str)) {
    throw new TypeError('First argument to dropLast must be a string');
  }
  return _.first(str, str.length - +n).join('');
};

module.exports = {
  capitalize: capitalize,
  without: without,
  withoutNum: withoutNum,
  endsWith: endsWith,
  dropLast: dropLast
};

/*
//@ sourceMappingURL=string-utils.js.map
*/