var delta, noteDelta, noteToNum;

noteToNum = require('./note_helpers').noteToNum;

delta = function(n1, n2) {
  return Math.abs(n2 - n1);
};

noteDelta = function(n1, n2) {
  var x, y, z, _ref;
  _ref = [n1, n2].map(noteToNum), n1 = _ref[0], n2 = _ref[1];
  x = delta(n1, n2);
  y = delta(n1 + 12, n2);
  z = delta(n1, n2 + 12);
  return Math.min(x, y, z);
};

module.exports = {
  "noteDelta": noteDelta
};

/*
//@ sourceMappingURL=note-deltas.js.map
*/