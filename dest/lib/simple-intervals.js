var applyTimes, decNote, decTimes, fifth, fourth, ifact, incNote, incTimes, intervals, keys, note_helpers, nthWith, seccond, seventh, sixth, third, withoutNum, _interval, _ref;

note_helpers = require("./note_helpers");

nthWith = require('flipped').nthWith;

_ref = require("./utils.coffee"), applyTimes = _ref.applyTimes, withoutNum = _ref.withoutNum;

incNote = note_helpers.simple.incNote;

decNote = note_helpers.simple.decNote;

keys = note_helpers.keys;

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
    note = note.toUpperCase();
    return withoutNum(intervals[deg](note));
  };
};

module.exports = {
  "d1": ifact("d1"),
  "P1": ifact("P1"),
  "A1": ifact("A1"),
  "d2": ifact("d2"),
  "m2": ifact("m2"),
  "M2": ifact("M2"),
  "A2": ifact("A2"),
  "d3": ifact("d3"),
  "m3": ifact("m3"),
  "M3": ifact("M3"),
  "A3": ifact("A3"),
  "d4": ifact("d4"),
  "P4": ifact("P4"),
  "A4": ifact("A4"),
  "d5": ifact("d5"),
  "P5": ifact("P5"),
  "A5": ifact("A5"),
  "d6": ifact("d6"),
  "m6": ifact("m6"),
  "M6": ifact("M6"),
  "A6": ifact("A6"),
  "d7": ifact("d7"),
  "m7": ifact("m7"),
  "M7": ifact("M7"),
  "A7": ifact("A7")
};

/*
//@ sourceMappingURL=simple-intervals.js.map
*/