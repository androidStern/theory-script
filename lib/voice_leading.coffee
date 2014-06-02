{first, map, zip} = require 'lodash'
{permutations} = require 'array-extended'
{noteDelta} = require "./intervals/note-deltas"
{mapwith} = require 'flipped'
{getChord} = require './chords/chords'

find_voicings = (ch1, ch2)-> map permutations(ch1), (c)-> zip c, ch2

weigh_voicing = (voicing)->
	score = 0
	for voice in voicing
		score += noteDelta(voice[0], voice[1])
	return score


compare_voicings = (v1, v2)->
	[w1,w2] = map [v1,v2], weigh_voicing
	w2 < w1

best_voicing = (voicings)->
	best = first(voicings)
	for voicing in voicings
		if compare_voicings(best, voicing) then best = voicing
	return best

voice_chords = (c1,c2)->
	c1= getChord c1
	c2 = getChord c2
	perms = find_voicings(c1,c2)
	best_voicing(perms)


cminor = {pitch:"C", quality: "minor"}

g7 = {pitch: "G", quality: "major"}

console.log voice_chords "C", "G7"
