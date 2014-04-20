var NoteIter, OctIter, ScaleIter, applyKey, at, binary, c_major, indexOf, indexOfC, keySig, map, take, takeIter, x, z, _, __,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('lodash');

__ = require('allong.es').allong.es;

indexOf = _.indexOf;

at = _.at;

take = _.take;

map = __.map;

binary = __.binary;

keySig = (function() {
  var keys;
  keys = {
    'C': {
      acc: '',
      notes: []
    },
    'G': {
      acc: '#',
      notes: ['F']
    },
    'D': {
      acc: '#',
      notes: ['F', 'C']
    },
    'A': {
      acc: '#',
      notes: ['F', 'C', 'G']
    },
    'E': {
      acc: '#',
      notes: ['F', 'C', 'G', 'D']
    },
    'B': {
      acc: '#',
      notes: ['F', 'C', 'G', 'D', 'A']
    },
    'F': {
      acc: 'b',
      notes: ['B']
    },
    'Bb': {
      acc: 'b',
      notes: ['B', 'E']
    },
    'Eb': {
      acc: 'b',
      notes: ['B', 'E', 'A']
    },
    'Ab': {
      acc: 'b',
      notes: ['B', 'E', 'A', 'D']
    },
    'Db': {
      acc: 'b',
      notes: ['B', 'E', 'A', 'D', 'G']
    },
    'Gb': {
      acc: 'b',
      notes: ['B', 'E', 'A', 'D', 'G', 'C']
    }
  };
  return function(note) {
    return keys[note];
  };
})();

c_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

indexOfC = binary(indexOf)(c_major);

applyKey = function(key) {
  return function(note) {
    var keysig;
    note = take(note);
    keysig = keySig(key);
    if (__indexOf.call(keysig.notes, note) >= 0) {
      note = note + keysig.acc;
    }
    return note;
  };
};

OctIter = function(base) {
  return function() {
    return Math.floor(base++ / 7);
  };
};

NoteIter = function(idx) {
  var c_maj, len;
  c_maj = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  len = c_maj.length;
  idx = idx || 0;
  return function() {
    return c_maj[idx++ % len];
  };
};

ScaleIter = function(key, oct) {
  var idx, keyFilter, n, _noteIter, _octIter;
  keyFilter = applyKey(key);
  oct = oct || 0;
  n = take(key);
  idx = indexOfC(n);
  _octIter = OctIter(idx);
  _noteIter = NoteIter(idx);
  return function() {
    return keyFilter(_noteIter()) + (_octIter() + oct);
  };
};

x = ScaleIter('Db', 2);

takeIter = function(iter, num) {
  var _i, _results;
  if (num > 0) {
    return map((function() {
      _results = [];
      for (var _i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), iter);
  } else {
    return [];
  }
};

z = takeIter(x, 8);

console.log(z);

/*
//@ sourceMappingURL=theory_script.js.map
*/