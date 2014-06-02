var decTimes, fifth, fourth, h, incTimes, intervals, seccond, seventh, sixth, third, u, _interval;

h = require("./note_helpers.coffee");

u = require("./utils.coffee");

incTimes = u.applyTimes(h.incNote);

decTimes = u.applyTimes(h.decNote);

_interval = function(pos) {
  return function(note) {
    var n;
    n = pos(h.keys(u.withoutNum(note)));
    return u.withoutNum(n) + (getDigits(note) + h.getOct(n));
  };
};

seccond = _interval(u.nthWith(1));

third = _interval(u.nthWith(2));

fourth = _interval(u.nthWith(3));

fifth = _interval(u.nthWith(4));

sixth = _interval(u.nthWith(5));

seventh = _interval(u.nthWith(6));

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

/*
//@ sourceMappingURL=intervals.js.map
*/