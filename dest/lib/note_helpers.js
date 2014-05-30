var addFlat, addSharp, baseNote, cOffset, c_Maj, decNote, endsWithFlat, endsWithSharp, getOct, inC, incNote, isNote, keys, note_helpers, removeFlat, removeSharp, utils, withoutFlat, withoutSharp;

utils = require("./utils.coffee");

keys = require('./maj_scales.coffee').keys;

c_Maj = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

endsWithSharp = utils.endsWith('#');

endsWithFlat = utils.endsWith('b');

getOct = function(str) {
  var d;
  d = str.match(/\d/g);
  if (d != null) {
    return Number(d.join(""));
  } else {
    return 0;
  }
};

removeFlat = function(note) {
  if (endsWithFlat(note)) {
    return utils.dropLast(note);
  }
};

addSharp = function(note) {
  return note + '#';
};

incNote = function(note) {
  var n, oct;
  oct = getOct(note);
  n = utils.withoutNum(note);
  if (n.length === 1 || endsWithSharp(n)) {
    return addSharp(n) + oct;
  } else if (endsWithFlat(n)) {
    return removeFlat(n) + oct;
  }
};

removeSharp = function(note) {
  if (endsWithSharp(note)) {
    return utils.dropLast(note);
  }
};

addFlat = function(note) {
  return note + 'b';
};

decNote = function(note) {
  var n, oct;
  oct = getOct(note);
  n = utils.withoutNum(note);
  if (n.length === 1 || endsWithFlat(n)) {
    return addFlat(n) + oct;
  } else if (endsWithSharp(n)) {
    return removeSharp(n) + oct;
  }
};

inC = function(note) {
  return utils.contains(c_Maj, note);
};

isNote = function(n) {
  if (!inC(utils.first(n).toUpperCase())) {
    return false;
  }
  n = utils.rest(n);
  if (utils.isEmpty(n)) {
    return true;
  }
  if (isNumber(Number(n[0]))) {
    return utils.allNumbers(n);
  }
  if (isAcc(n[0])) {
    if (utils.isEmpty(utils.rest(n))) {
      true;
    } else {
      utils.allNumbers(utils.rest(n));
    }
  }
  return false;
};

withoutSharp = utils.strWithout(/#/g);

withoutFlat = utils.strWithout(/b/g);

baseNote = utils.compose(utils.first, utils.withoutNum, withoutSharp, withoutFlat);

cOffset = function(note) {
  return c_Maj.indexOf(baseNote(note));
};

note_helpers = {
  "getOct": getOct,
  "incNote": incNote,
  "decNote": decNote,
  "cOffset": cOffset,
  "keys": keys
};

/*
//@ sourceMappingURL=note_helpers.js.map
*/