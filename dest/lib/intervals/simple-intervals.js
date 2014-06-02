var applyTimes, capitalize, decNote, decTimes, fifth, fourth, ifact, incNote, incTimes, interval_names, intervals, keys, nthWith, seccond, seventh, sixth, third, v, withoutNum, _i, _interval, _len, _ref, _ref1;

_ref = require("../note-helpers"), incNote = _ref.incNote, decNote = _ref.decNote, keys = _ref.keys;

nthWith = require('flipped').nthWith;

_ref1 = require("../utils"), applyTimes = _ref1.applyTimes, withoutNum = _ref1.withoutNum;

capitalize = require('../utils/string-utils').capitalize;

incTimes = applyTimes(incNote);

decTimes = applyTimes(decNote);

_interval = function(pos) {
  return function(note) {
    return pos(keys(note));
  };
};

seccond = _interval(nthWith(1));

third = _interval(nthWith(2));

fourth = _interval(nthWith(3));

fifth = _interval(nthWith(4));

sixth = _interval(nthWith(5));

seventh = _interval(nthWith(6));

intervals = {
  "d1": function(note) {
    return decTimes(note, 1);
  },
  "P1": function(note) {
    return note;
  },
  "A1": function(note) {
    return incTimes(note, 1);
  },
  "d2": function(note) {
    return decTimes(seccond(note), 2);
  },
  "m2": function(note) {
    return decTimes(seccond(note), 1);
  },
  "M2": function(note) {
    return seccond(note);
  },
  "A2": function(note) {
    return incTimes(seccond(note), 1);
  },
  "d3": function(note) {
    return decTimes(third(note), 2);
  },
  "m3": function(note) {
    return decTimes(third(note), 1);
  },
  "M3": function(note) {
    return third(note);
  },
  "A3": function(note) {
    return incTimes(third(note), 1);
  },
  "d4": function(note) {
    return decTimes(fourth(note), 1);
  },
  "P4": function(note) {
    return fourth(note);
  },
  "A4": function(note) {
    return incTimes(fourth(note), 1);
  },
  "d5": function(note) {
    return decTimes(fifth(note), 1);
  },
  "P5": function(note) {
    return fifth(note);
  },
  "A5": function(note) {
    return incTimes(fifth(note), 1);
  },
  "d6": function(note) {
    return decTimes(sixth(note), 2);
  },
  "m6": function(note) {
    return decTimes(sixth(note), 1);
  },
  "M6": function(note) {
    return sixth(note);
  },
  "A6": function(note) {
    return incTimes(sixth(note), 1);
  },
  "d7": function(note) {
    return decTimes(seventh(note), 2);
  },
  "m7": function(note) {
    return decTimes(seventh(note), 1);
  },
  "M7": function(note) {
    return seventh(note);
  },
  "A7": function(note) {
    return incTimes(seventh(note), 1);
  }
};

ifact = function(deg) {
  return function(note) {
    note = capitalize(note);
    return intervals[deg](note);
  };
};

interval_names = ["d1", "P1", "A1", "d2", "m2", "M2", "A2", "d3", "m3", "M3", "A3", "d4", "P4", "A4", "d5", "P5", "A5", "d6", "m6", "M6", "A6", "d7", "m7", "M7", "A7"];

for (_i = 0, _len = interval_names.length; _i < _len; _i++) {
  v = interval_names[_i];
  module.exports[v] = ifact(v);
}

/*
//@ sourceMappingURL=simple-intervals.js.map
*/