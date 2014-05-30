{P1, m3, M3, P5, d5, m7, d7, M7} = require "./simple-intervals.coffee"
_ = require 'lodash'

intervalMap =
	"major": [P1, M3, P5]
	"major-7": [P1, M3, P5, M7]
	"minor": [P1, m3, P5]
	"minor-7": [P1, m3, P5, m7]
	"half-diminished-7": [P1, m3, d5, m7]
	"diminished-7": [P1, m3, d5, d7]

fromNote = (note, tonality)->
	root = note.toUpperCase()
	_.map intervalMap[tonality], (fn)-> fn(root)
