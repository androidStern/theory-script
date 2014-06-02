{noteToNum} = require '../note-helpers'

delta = (n1, n2)-> Math.abs(n2 - n1)

noteDelta = (n1, n2)->
	[n1, n2] = [n1, n2].map noteToNum
	x = delta(n1, n2)
	y = delta(n1 + 12, n2)
	z = delta(n1, n2 + 12)
	Math.min(x, y, z)

module.exports =
	"noteDelta": noteDelta
