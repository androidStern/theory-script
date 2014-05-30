utils = require "./utils.coffee"

# {utils.strWithout, utils.endsWith, utils.dropLast, utils.first, utils.rest, utils.isEmpty, utils.contains, utils.allNumbers, utils.withoutNum, utils.compose} = require './utils.coffee'

{keys} = require './maj_scales.coffee'

c_Maj = ['C','D','E','F','G','A','B']

endsWithSharp = utils.endsWith '#'
endsWithFlat  = utils.endsWith 'b'

getOct = (str)->
  d = str.match(/\d/g)
  if d? then Number(d.join("")) else 0

# Inc Note
removeSharp = (note)-> if endsWithSharp note then utils.dropLast note
removeFlat = (note)-> if endsWithFlat note then utils.dropLast note

addSharp = (note)-> note + '#'
addFlat = (note)-> note + 'b'

simple = {}

simple.incNote = (note)->
  oct = getOct note
  n = utils.withoutNum note
  if n.length is 1 or endsWithSharp(n) then addSharp(n)
  else if endsWithFlat(n) then removeFlat(n)


incNote = (note)->
  oct = getOct note
  n = utils.withoutNum note
  if n.length is 1 or endsWithSharp(n) then addSharp(n) + oct
  else if endsWithFlat(n) then removeFlat(n) + oct

# Dec Note





simple.decNote = (note)->
  oct = getOct note
  n = utils.withoutNum note
  if n.length is 1 or endsWithFlat(n) then addFlat(n)
  else if endsWithSharp(n) then removeSharp(n)


decNote = (note)->
  oct = getOct note
  n = utils.withoutNum note
  if n.length is 1 or endsWithFlat(n) then addFlat(n) + oct
  else if endsWithSharp(n) then removeSharp(n) + oct

# Is Note
inC = (note)-> utils.contains c_Maj, note
isNote = (n)->
  if not inC(utils.first(n).toUpperCase()) then return false
  n = utils.rest n
  if utils.isEmpty(n) then return true
  if isNumber Number(n[0]) then return utils.allNumbers(n)
  if isAcc(n[0])
    if utils.isEmpty utils.rest(n) then true else utils.allNumbers utils.rest(n)
  false

# C offset
withoutSharp = utils.strWithout /#/g
withoutFlat = utils.strWithout /b/g
baseNote = utils.compose utils.first, utils.withoutNum, withoutSharp, withoutFlat

cOffset = (note)-> c_Maj.indexOf baseNote(note)


module.exports =
  "getOct": getOct
  "incNote": incNote
  "decNote":decNote
  "cOffset":cOffset
  "keys":keys
  "simple": simple
