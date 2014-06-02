h = require "./note_helpers.coffee"
u = require "./utils.coffee"

incTimes  = u.applyTimes h.incNote
decTimes  = u.applyTimes h.decNote

_interval = (pos)-> (note)->
    n = pos(h.keys(u.withoutNum(note)))
    u.withoutNum(n) + (getDigits(note) + h.getOct(n))

seccond = _interval u.nthWith(1)
third = _interval u.nthWith(2)
fourth = _interval u.nthWith(3)
fifth = _interval u.nthWith(4)
sixth = _interval u.nthWith(5)
seventh = _interval u.nthWith(6)

intervals =
  "d1": (note)-> decTimes note, 1
  "P1": (note)-> note
  "A1": (note)-> incTimes note, 1
  "d2": (note)-> decTimes seccond(note), 2
  "m2": (note)-> decTimes seccond(note), 1
  "M2": (note)-> seccond note
  "A2": (note)-> incTimes seccond(note), 1
  "d3": (note)-> decTimes third(note), 2
  "m3": (note)-> decTimes third(note), 1
  "M3": (note)-> third note
  "A3": (note)-> incTimes third(note), 1
  "d4": (note)-> decTimes fourth(note), 1
  "P4": (note)-> fourth note
  "A4": (note)-> incTimes fourth(note), 1
  "d5": (note)-> decTimes fifth(note), 1
  "P5": (note)-> fifth note
  "A5": (note)-> incTimes fifth(note), 1
  "d6": (note)-> decTimes sixth(note), 2
  "m6": (note)-> decTimes sixth(note), 1
  "M6": (note)-> sixth note
  "A6": (note)-> incTimes sixth(note), 1
  "d7": (note)-> decTimes seventh(note), 2
  "m7": (note)-> decTimes seventh(note), 1
  "M7": (note)-> seventh note
  "A7": (note)-> incTimes seventh(note), 1
