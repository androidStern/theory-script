var best_voicing, chordFromNote, cminor, compare_voicings, find_voicings, first, g7, map, mapwith, noteDelta, permutations, voice_chords, weigh_voicing, zip, _ref;

_ref = require('lodash'), first = _ref.first, map = _ref.map, zip = _ref.zip;

permutations = require('array-extended').permutations;

noteDelta = require("./intervals/note-deltas").noteDelta;

mapwith = require('flipped').mapwith;

chordFromNote = require('./chords').chordFromNote;

find_voicings = function(ch1, ch2) {
  return map(permutations(ch1), function(c) {
    return zip(c, ch2);
  });
};

weigh_voicing = function(voicing) {
  var score, voice, _i, _len;
  score = 0;
  for (_i = 0, _len = voicing.length; _i < _len; _i++) {
    voice = voicing[_i];
    score += noteDelta(voice[0], voice[1]);
  }
  return score;
};

compare_voicings = function(v1, v2) {
  var w1, w2, _ref1;
  _ref1 = map([v1, v2], weigh_voicing), w1 = _ref1[0], w2 = _ref1[1];
  return w2 < w1;
};

best_voicing = function(voicings) {
  var best, voicing, _i, _len;
  best = first(voicings);
  for (_i = 0, _len = voicings.length; _i < _len; _i++) {
    voicing = voicings[_i];
    if (compare_voicings(best, voicing)) {
      best = voicing;
    }
  }
  return best;
};

voice_chords = function(c1, c2) {
  var perms;
  c1 = chordFromNote(c1.pitch, c1.quality);
  c2 = chordFromNote(c2.pitch, c2.quality);
  perms = find_voicings(c1, c2);
  return best_voicing(perms);
};

cminor = {
  pitch: "C",
  quality: "minor"
};

g7 = {
  pitch: "G",
  quality: "major"
};

console.log(voice_chords(cminor, g7));

/*
//@ sourceMappingURL=voice_leading.js.map
*/