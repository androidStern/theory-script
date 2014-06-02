var best_voicing, binary, c, compare_voicings, compose, find_voicings, first, flip, fromNote, g, idxWithC, idx_in_c, indexOf, map, mapWith, noteDelta, partial, perms, permutations, voice_chords, weigh_voicing, zip, _ref, _ref1;

_ref = require('lodash'), compose = _ref.compose, first = _ref.first, map = _ref.map, indexOf = _ref.indexOf, zip = _ref.zip;

permutations = require('array-extended').permutations;

_ref1 = require('fn-utils'), partial = _ref1.partial, flip = _ref1.flip;

noteDelta = require("./note-deltas").noteDelta;

mapWith = flip(map);

fromNote = require('./chords.coffee').fromNote;

binary = function(fn) {
  return function(a, b) {
    return fn(a, b);
  };
};

idx_in_c = compose(first, mapWith(partial(binary(indexOf), ['C', 'D', 'E', 'F', 'G', 'A', 'B'])));

idxWithC = function(note) {
  return idx_in_c(note.toUpperCase());
};

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
  var w1, w2, _ref2;
  _ref2 = map([v1, v2], weigh_voicing), w1 = _ref2[0], w2 = _ref2[1];
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

perms = find_voicings(['c', 'e', 'g'], ['d', 'f', 'a']);

voice_chords = function(c1, c2) {
  c1 = fromNote(c1.pitch, c1.quality);
  c2 = fromNote(c2.pitch, c2.quality);
  perms = find_voicings(c1, c2);
  return best_voicing(perms);
};

c = {
  pitch: "c",
  quality: "major"
};

g = {
  pitch: "g",
  quality: "major"
};

console.log(voice_chords(c, g));

/*
//@ sourceMappingURL=voice_leading.js.map
*/