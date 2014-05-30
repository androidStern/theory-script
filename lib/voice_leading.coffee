_ = require 'lodash'

{permutations} = require 'array-extended'

{binary, partial, flip, ncurry, curry, curry2, mapWith, pluckWith, filterWith, reduceWith} = require 'fn_utils'

c_scale = ['c','d','e','f','g','a','b']

idx_in_c = _.compose _.first, mapWith partial(binary(_.indexOf), c_scale)

find_voicings = (ch1, ch2)-> _.map permutations(ch1), (c)-> _.zip c, ch2

weigh_voicing = (voicing)->
	score = 0
	for voice in voicing
		[n1,n2] = _.map voice, idx_in_c
		score += Math.abs(n2 - n1)
	return score

compare_voicings = (v1, v2)->
	[w1,w2] = _.map [v1,v2], weigh_voicing
	w2 < w1

best_voicing = (voicings)->
	best = _.first(voicings)
	for voicing in voicings
		if compare_voicings(best, voicing) then best = voicing
	return best

perms = find_voicings ['c','e','g'], ['d','f','a']

console.log best_voicing(perms)
