{incNote, decNote, keys} = require "../note-helpers"
{nthWith} = require 'flipped'
{applyTimes, withoutNum} = require "../utils"
{capitalize} = require '../utils/string-utils'

incTimes  = applyTimes incNote

decTimes  = applyTimes decNote

_interval = (pos)-> (note)-> pos(keys(note))

# diatonic intervals
seccond = _interval nthWith(1)
third = _interval nthWith(2)
fourth = _interval nthWith(3)
fifth = _interval nthWith(4)
sixth = _interval nthWith(5)
seventh = _interval nthWith(6)

# chromatic intervals
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
	note = capitalize note
	intervals[deg](note)

interval_names = [
	"d1", "P1", "A1",
	"d2", "m2", "M2", "A2",
	"d3", "m3", "M3", "A3",
	"d4", "P4", "A4",
	"d5", "P5", "A5",
	"d6", "m6", "M6", "A6",
	"d7", "m7", "M7", "A7"
]

for v in interval_names
	module.exports[v] = ifact v
