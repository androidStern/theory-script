var M3, M7, P1, P5, d5, d7, degrees, endsWith, flip, fromNote, getChord, m3, m7, parseChord, _, _ref;

_ref = require("../intervals/simple-intervals"), P1 = _ref.P1, m3 = _ref.m3, M3 = _ref.M3, P5 = _ref.P5, d5 = _ref.d5, m7 = _ref.m7, d7 = _ref.d7, M7 = _ref.M7;

_ = require('lodash');

endsWith = require("../utils/string-utils").endsWith;

flip = require('fn-utils').flip;

parseChord = require('./parse-chord').parseChord;

degrees = {
  "major": [P1, M3, P5],
  "major-7": [P1, M3, P5, M7],
  "minor": [P1, m3, P5],
  "minor-7": [P1, m3, P5, m7],
  "dominant-7": [P1, M3, P5, m7],
  "half-diminished-7": [P1, m3, d5, m7],
  "diminished-7": [P1, m3, d5, d7]
};

fromNote = function(chord) {
  var root;
  root = chord.pitch.toUpperCase();
  return _.map(degrees[chord.quality], function(fn) {
    return fn(root);
  });
};

getChord = function(chord) {
  if (_.isString(chord)) {
    return fromNote(parseChord(chord));
  } else {
    return fromNote(chord);
  }
};

module.exports = {
  "getChord": getChord
};

/*
//@ sourceMappingURL=chords.js.map
*/