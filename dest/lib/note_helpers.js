var addFlat, addSharp, baseNote, cOffset, c_Maj, capitalize, decNote, endsWithFlat, endsWithSharp, getOct, idxFlat, idxSharp, inC, incNote, indexOf, isNote, keys, noteToNum, removeFlat, removeSharp, simple, utils, withoutFlat, withoutSharp;

utils = require("./utils.coffee");

indexOf = require('lodash').indexOf;

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

removeSharp = function(note) {
  if (endsWithSharp(note)) {
    return utils.dropLast(note);
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

addFlat = function(note) {
  return note + 'b';
};

simple = {};

simple.incNote = function(note) {
  var n, oct;
  oct = getOct(note);
  n = utils.withoutNum(note);
  if (n.length === 1 || endsWithSharp(n)) {
    return addSharp(n);
  } else if (endsWithFlat(n)) {
    return removeFlat(n);
  }
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

simple.decNote = function(note) {
  var n, oct;
  oct = getOct(note);
  n = utils.withoutNum(note);
  if (n.length === 1 || endsWithFlat(n)) {
    return addFlat(n);
  } else if (endsWithSharp(n)) {
    return removeSharp(n);
  }
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

/*
*/


capitalize = function(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

idxFlat = function(note) {
  return indexOf(["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], capitalize(note));
};

idxSharp = function(note) {
  return indexOf(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], capitalize(note));
};

noteToNum = function(note) {
  note = capitalize(note);
  if (note.length === 1) {
    return idxSharp(note);
  } else {
    if (note[1] === "#") {
      return idxSharp(note);
    } else if (note[1] === "b") {
      return idxFlat(note);
    }
  }
};

module.exports = {
  "getOct": getOct,
  "incNote": incNote,
  "decNote": decNote,
  "cOffset": cOffset,
  "keys": keys,
  "simple": simple,
  "noteToNum": noteToNum
};

/*
//@ sourceMappingURL=note_helpers.js.map
*/