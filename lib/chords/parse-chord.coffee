{each} = require "lodash"
qualities =
	"major": ["M"]
	"major-7": ["M7", "maj7", "Maj7", "MAJ7"]
	"minor": ["-", "m", "min", "MIN"]
	"minor-7": ["-7", "m7", "min7", "MIN7"]
	"dominant-7": ["7", "dom", "dom7", "DOM7"]
	"half-diminished-7": ["-7b5", "min7b5", "m7b5", "min7flat5"]
	"diminished-7": ["d7", "dim7"]
	"diminished": ["d", "dim"]

isAcc = (e)-> e in ["#", "b"]

rm_note = (chord)->
	truth = true
	while truth
		chord = chord[1..-1]
		truth = isAcc chord[0]
	return chord

parseChord = (chord)->
	c = pitch: chord[0], quality: "major"
	qual = rm_note chord
	_.each qualities, (v,k)-> if qual in v then c.quality = k
	return c

module.exports =
	parseChord: parseChord
