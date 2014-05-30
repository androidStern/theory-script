note_helpers = require "./note_helpers.coffee"

incNote = note_helpers.simple.incNote
decNote = note_helpers.simple.decNote
keys = note_helpers.keys

{applyTimes, nthWith, withoutNum} = require "./utils.coffee"

incTimes  = applyTimes incNote

decTimes  = applyTimes decNote

_interval = (pos)-> (note)-> pos(keys(note))

seccond = _interval nthWith(1)
third = _interval nthWith(2)
fourth = _interval nthWith(3)
fifth = _interval nthWith(4)
sixth = _interval nthWith(5)
seventh = _interval nthWith(6)


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


ifact = (deg)-> (note)->
	note = note.toUpperCase()
	withoutNum(intervals[deg](note))


module.exports =
	"d1": ifact("d1")
	"P1": ifact("P1")
	"A1": ifact("A1")
	"d2": ifact("d2")
	"m2": ifact("m2")
	"M2": ifact("M2")
	"A2": ifact("A2")
	"d3": ifact("d3")
	"m3": ifact("m3")
	"M3": ifact("M3")
	"A3": ifact("A3")
	"d4": ifact("d4")
	"P4": ifact("P4")
	"A4": ifact("A4")
	"d5": ifact("d5")
	"P5": ifact("P5")
	"A5": ifact("A5")
	"d6": ifact("d6")
	"m6": ifact("m6")
	"M6": ifact("M6")
	"A6": ifact("A6")
	"d7": ifact("d7")
	"m7": ifact("m7")
	"M7": ifact("M7")
	"A7": ifact("A7")
