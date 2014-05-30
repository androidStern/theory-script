var NoteIter, OctIter, note_helpers, toMajScale, utils;

note_helpers = require("./note_helpers.coffee");

utils = require("./utils.coffee");

toMajScale = function(note) {
  return note_helpers.keys(utils.withoutNum(note));
};

OctIter = function(i) {
  return function() {
    return Math.floor(i++ / 7);
  };
};

NoteIter = function(scale, i) {
  return function() {
    return utils.withoutNum(utils.nthWith(i++ % 7, scale));
  };
};

module.exports = function(note) {
  var oct, oct_start_point, scale, _noteIter, _octIter;
  scale = toMajScale(note);
  oct = note_helpers.getOct(note);
  _noteIter = NoteIter(scale, 0);
  oct_start_point = note_helpers.cOffset(note);
  _octIter = OctIter(oct_start_point);
  return function() {
    return _noteIter() + (_octIter() + oct);
  };
};

/*
//@ sourceMappingURL=theory_script.js.map
*/