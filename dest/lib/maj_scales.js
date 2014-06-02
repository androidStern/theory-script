var capitalize;

capitalize = require("./utils/string-utils").capitalize;

module.exports.keys = (function() {
  var _keys_with_octaves, _keys_without_octaves;
  _keys_with_octaves = {
    'C': ['C0', 'D0', 'E0', 'F0', 'G0', 'A0', 'B0'],
    'G': ['G0', 'A0', 'B0', 'C1', 'D1', 'E1', 'F#1'],
    'D': ['D0', 'E0', 'F#0', 'G0', 'A0', 'B0', 'C#1'],
    'A': ['A0', 'B0', 'C#1', 'D1', 'E1', 'F#1', 'G#1'],
    'E': ['E0', 'F#0', 'G#0', 'A0', 'B0', 'C#1', 'D#1'],
    'B': ['B0', 'C#1', 'D#1', 'E1', 'F#1', 'G#1', 'A#1'],
    'F': ['F0', 'G0', 'A0', 'Bb0', 'C1', 'D1', 'E1'],
    'C#': ['C#0', 'D#0', 'E#0', 'F#0', 'G#0', 'A#0', 'B#0'],
    'G#': ['G#0', 'A#0', 'B#0', 'C#1', 'D#1', 'E#1', 'F##1'],
    'D#': ['D#0', 'E#0', 'F##0', 'G#0', 'A#0', 'B#0', 'C##1'],
    'A#': ['A#0', 'B#0', 'C##1', 'D#1', 'E#1', 'F##1', 'G##1'],
    'E#': ['E#0', 'F##0', 'G##0', 'A#0', 'B#0', 'C##1', 'D##1'],
    'B#': ['B#0', 'C##1', 'D##1', 'E#1', 'F##1', 'G##1', 'A##1'],
    'F#': ['F#0', 'G#0', 'A#0', 'B0', 'C#1', 'D#1', 'E#1'],
    'Bb': ['Bb0', 'C1', 'D1', 'Eb1', 'F1', 'G1', 'A1'],
    'Eb': ['Eb0', 'F0', 'G0', 'Ab0', 'Bb0', 'C1', 'D1'],
    'Ab': ['Ab0', 'Bb0', 'C1', 'Db1', 'Eb1', 'F1', 'G1'],
    'Db': ['Db0', 'Eb0', 'F0', 'Gb0', 'Ab0', 'Bb0', 'C1'],
    'Gb': ['Gb0', 'Ab0', 'Bb0', 'Cb1', 'Db1', 'Eb1', 'F1'],
    'Cb': ['Cb0', 'Db0', 'Eb0', 'Fb0', 'Gb0', 'Ab0', 'Bb0'],
    'Fb': ['Fb0', 'Gb0', 'Ab0', 'Bbb0', 'Cb1', 'Db1', 'Eb1']
  };
  _keys_without_octaves = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
    'G#': ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##'],
    'D#': ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##'],
    'A#': ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##'],
    'E#': ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##'],
    'B#': ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'],
    'Fb': ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb']
  };
  return function(key, opts) {
    if (opts == null) {
      opts = {
        oct: false
      };
    }
    key = capitalize(key);
    if (opts.oct) {
      return _keys_with_octaves[key];
    } else {
      return _keys_without_octaves[key];
    }
  };
})();

/*
//@ sourceMappingURL=maj_scales.js.map
*/