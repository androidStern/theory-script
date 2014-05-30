var arr_equals, gen_increasing_length_str_pair, gen_kinda_random_string, gen_non_substr_pair, getRandomArbitrary, rand_string, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('lodash');

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

getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

rand_string = function() {
  var len, res, str;
  str = Math.random().toString(36);
  len = str.length;
  res = '';
  while (res.length === 0) {
    res = str.substring(getRandomArbitrary(0, len));
  }
  return res;
};

gen_kinda_random_string = function() {
  var res, str, valid_chars;
  str = rand_string();
  valid_chars = ['a', 'e', 'i', 'o', 'u', 'a', 'b', 'c', 'd', 'e', 'f'];
  res = _.filter(str, function(e) {
    return __indexOf.call(valid_chars, e) >= 0;
  });
  res = res.join('');
  if (res.length > 2) {
    return res;
  } else {
    return gen_kinda_random_string();
  }
};

gen_non_substr_pair = function() {
  var first, sec, sec_contains_first;
  first = gen_kinda_random_string();
  sec = gen_kinda_random_string();
  sec_contains_first = sec.indexOf(first);
  if (sec.indexOf(first === -1)) {
    return [first, sec];
  } else {
    return gen_diff_srings_of_inc_length();
  }
};

gen_increasing_length_str_pair = function() {
  var first, sec;
  first = gen_kinda_random_string();
  sec = gen_kinda_random_string();
  if (first.length > sec.length) {
    return [first, sec];
  } else {
    return gen_increasing_length_str_pair();
  }
};

module.exports = {
  arr_equals: arr_equals,
  getRandomArbitrary: getRandomArbitrary,
  rand_string: rand_string,
  gen_non_substr_pair: gen_non_substr_pair,
  gen_kinda_random_string: gen_kinda_random_string,
  gen_increasing_length_str_pair: gen_increasing_length_str_pair
};
