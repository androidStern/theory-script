{capitalize} = require "./utils/string-utils"
{allNumbers} = require "./utils"
{endsWith, dropLast, withoutNum, without} = require "./utils/string-utils"
{indexOf, compose, first, rest, contains, isEmpty} = require 'lodash'
{keys} = require './maj_scales'

c_Maj = ['C','D','E','F','G','A','B']

endsWithSharp = endsWith '#'
endsWithFlat  = endsWith 'b'

getOct = (str)->
  d = str.match(/\d/g)
  if d? then Number(d.join("")) else 0


removeSharp = (note)-> if endsWithSharp note then dropLast note
removeFlat = (note)-> if endsWithFlat note then dropLast note

addSharp = (note)-> note + '#'
addFlat = (note)-> note + 'b'

# Inc Note
incNote = (note, opts = {oct: false})->
  oct = getOct note
  n = withoutNum note
  _note = if n.length is 1 or endsWithSharp(n)
      addSharp(n)
    else if endsWithFlat(n)
      removeFlat(n)
  _note = if opts.oct then _note + oct else _note


# Dec Note
decNote = (note, opts = {oct: false})->
  oct = getOct note
  n = withoutNum note
  _note = if n.length is 1 or endsWithFlat(n)
      addFlat(n)
    else if endsWithSharp(n)
      removeSharp(n)
  _note = if opts.oct then _note + oct else _note

# Is Note
inC = (note)-> contains c_Maj, note

isNote = (n)->
  if not inC(first(n).toUpperCase()) then return false
  n = rest n
  if isEmpty(n) then return true
  if isNumber Number(n[0]) then return allNumbers(n)
  if isAcc(n[0])
    if isEmpty rest(n) then true else allNumbers rest(n)
  false

# C offset
withoutSharp = without /#/g
withoutFlat = without /b/g
baseNote = compose first, withoutNum, withoutSharp, withoutFlat

cOffset = (note)-> c_Maj.indexOf baseNote(note)


###

###

idxFlat = (note)->
  indexOf ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], capitalize(note)

idxSharp = (note)->
  indexOf ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], capitalize(note)

noteToNum = (note)->
  note = capitalize(note)
  if note.length is 1
    return idxSharp note
  else
    if note[1] is "#"
      return idxSharp note
    else if note[1] is "b"
      return idxFlat note


module.exports =
  "getOct": getOct
  "incNote": incNote
  "decNote":decNote
  "cOffset":cOffset
  "keys":keys
  "noteToNum": noteToNum
  "capitalize": capitalize
