var M3, M7, P1, P5, chordFromNote, d5, d7, intervalMap, m3, m7, _, _ref;

_ref = require("./intervals/simple-intervals"), P1 = _ref.P1, m3 = _ref.m3, M3 = _ref.M3, P5 = _ref.P5, d5 = _ref.d5, m7 = _ref.m7, d7 = _ref.d7, M7 = _ref.M7;

_ = require('lodash');

intervalMap = {
  "major": [P1, M3, P5],
  "major-7": [P1, M3, P5, M7],
  "minor": [P1, m3, P5],
  "minor-7": [P1, m3, P5, m7],
  "dominant-7": [P1, M3, P5, m7],
  "half-diminished-7": [P1, m3, d5, m7],
  "diminished-7": [P1, m3, d5, d7]
};

chordFromNote = function(note, tonality) {
  var root;
  root = note.toUpperCase();
  return _.map(intervalMap[tonality], function(fn) {
    return fn(root);
  });
};

module.exports = {
  "chordFromNote": chordFromNote
};

/*
//@ sourceMappingURL=chords.js.map
*/