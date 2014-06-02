var each, isAcc, parseChord, qualities, rm_note,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

each = require("lodash").each;

qualities = {
  "major": ["M"],
  "major-7": ["M7", "maj7", "Maj7", "MAJ7"],
  "minor": ["-", "m", "min", "MIN"],
  "minor-7": ["-7", "m7", "min7", "MIN7"],
  "dominant-7": ["7", "dom", "dom7", "DOM7"],
  "half-diminished-7": ["-7b5", "min7b5", "m7b5", "min7flat5"],
  "diminished-7": ["d7", "dim7"],
  "diminished": ["d", "dim"]
};

isAcc = function(e) {
  return e === "#" || e === "b";
};

rm_note = function(chord) {
  var truth;
  truth = true;
  while (truth) {
    chord = chord.slice(1);
    truth = isAcc(chord[0]);
  }
  return chord;
};

parseChord = function(chord) {
  var c, qual;
  c = {
    pitch: chord[0],
    quality: "major"
  };
  qual = rm_note(chord);
  _.each(qualities, function(v, k) {
    if (__indexOf.call(v, qual) >= 0) {
      return c.quality = k;
    }
  });
  return c;
};

module.exports = {
  parseChord: parseChord
};

/*
//@ sourceMappingURL=parse-chord.js.map
*/