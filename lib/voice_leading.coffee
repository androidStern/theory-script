{compose, first, map, indexOf, zip} = require 'lodash'
{permutations} = require 'array-extended'
{partial, mapWith} = require 'fn_utils'

{fromNote} = require('./chords.coffee')

binary = (fn)-> (a,b)-> fn(a,b)

idx_in_c = compose first, mapWith partial(binary(indexOf), ['C','D','E','F','G','A','B'])

idxWithC = (note)-> idx_in_c(note.toUpperCase())

find_voicings = (ch1, ch2)-> map permutations(ch1), (c)-> zip c, ch2
	

weigh_voicing = (voicing)->
	score = 0
	for voice in voicing
		[n1,n2] = map voice, idxWithC
		score += Math.abs(n2 - n1)
	return score


weigh_voicing [["C", "D"]]


compare_voicings = (v1, v2)->
	[w1,w2] = map [v1,v2], weigh_voicing
	w2 < w1

best_voicing = (voicings)->
	best = first(voicings)
	for voicing in voicings
		if compare_voicings(best, voicing) then best = voicing
	return best

perms = find_voicings ['c','e','g'], ['d','f','a']

voice_chords = (c1,c2)->
	c1= fromNote(c1.pitch, c1.quality)
	c2 = fromNote(c2.pitch, c2.quality)
	perms = find_voicings(c1,c2)
	best_voicing(perms)


c = {pitch:"c", quality: "major"}
g = {pitch: "g", quality: "major"}

# console.log voice_chords(c, g)
