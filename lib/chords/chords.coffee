{P1, m3, M3, P5, d5, m7, d7, M7} = require "../intervals/simple-intervals"
_ = require 'lodash'
{endsWith} = require "../utils/string-utils"
{flip} = require 'fn-utils'
{parseChord} = require './parse-chord'



degrees =
	"major": [P1, M3, P5]
	"major-7": [P1, M3, P5, M7]
	"minor": [P1, m3, P5]
	"minor-7": [P1, m3, P5, m7]
	"dominant-7": [P1, M3, P5, m7]
	"half-diminished-7": [P1, m3, d5, m7]
	"diminished-7": [P1, m3, d5, d7]

fromNote = (chord)->
	root = chord.pitch.toUpperCase()
	_.map degrees[chord.quality], (fn)-> fn(root)


getChord = (chord)->
	if _.isString chord then fromNote parseChord(chord)
	else fromNote(chord)

module.exports =
	"getChord": getChord
