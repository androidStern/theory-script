var addFlat, addSharp, allNumbers, baseNote, cOffset, c_Maj, capitalize, compose, contains, decNote, dropLast, endsWith, endsWithFlat, endsWithSharp, first, getOct, idxFlat, idxSharp, inC, incNote, indexOf, isEmpty, isNote, keys, noteToNum, removeFlat, removeSharp, rest, without, withoutFlat, withoutNum, withoutSharp, _ref, _ref1;

capitalize = require("./utils/string-utils").capitalize;

allNumbers = require("./utils").allNumbers;

_ref = require("./utils/string-utils"), endsWith = _ref.endsWith, dropLast = _ref.dropLast, withoutNum = _ref.withoutNum, without = _ref.without;

_ref1 = require('lodash'), indexOf = _ref1.indexOf, compose = _ref1.compose, first = _ref1.first, rest = _ref1.rest, contains = _ref1.contains, isEmpty = _ref1.isEmpty;

keys = require('./maj_scales').keys;

c_Maj = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

endsWithSharp = endsWith('#');

endsWithFlat = endsWith('b');

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
    return dropLast(note);
  }
};

removeFlat = function(note) {
  if (endsWithFlat(note)) {
    return dropLast(note);
  }
};

addSharp = function(note) {
  return note + '#';
};

addFlat = function(note) {
  return note + 'b';
};

incNote = function(note, opts) {
  var n, oct, _note;
  if (opts == null) {
    opts = {
      oct: false
    };
  }
  oct = getOct(note);
  n = withoutNum(note);
  _note = n.length === 1 || endsWithSharp(n) ? addSharp(n) : endsWithFlat(n) ? removeFlat(n) : void 0;
  return _note = opts.oct ? _note + oct : _note;
};

decNote = function(note, opts) {
  var n, oct, _note;
  if (opts == null) {
    opts = {
      oct: false
    };
  }
  oct = getOct(note);
  n = withoutNum(note);
  _note = n.length === 1 || endsWithFlat(n) ? addFlat(n) : endsWithSharp(n) ? removeSharp(n) : void 0;
  return _note = opts.oct ? _note + oct : _note;
};

inC = function(note) {
  return contains(c_Maj, note);
};

isNote = function(n) {
  if (!inC(first(n).toUpperCase())) {
    return false;
  }
  n = rest(n);
  if (isEmpty(n)) {
    return true;
  }
  if (isNumber(Number(n[0]))) {
    return allNumbers(n);
  }
  if (isAcc(n[0])) {
    if (isEmpty(rest(n))) {
      true;
    } else {
      allNumbers(rest(n));
    }
  }
  return false;
};

withoutSharp = without(/#/g);

withoutFlat = without(/b/g);

baseNote = compose(first, withoutNum, withoutSharp, withoutFlat);

cOffset = function(note) {
  return c_Maj.indexOf(baseNote(note));
};

/*
*/


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
  "noteToNum": noteToNum,
  "capitalize": capitalize
};

/*
//@ sourceMappingURL=note-helpers.js.map
*/