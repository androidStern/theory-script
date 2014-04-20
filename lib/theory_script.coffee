_            = require 'lodash'
__           = require('allong.es').allong.es
indexOf      = _.indexOf
at           = _.at
take         = _.take
map          = __.map
binary       = __.binary

keySig = do ->
  keys =
    'C':
      acc: ''
      notes: []
    'G':
      acc:'#'
      notes: ['F']
    'D':
      acc:'#'
      notes: ['F', 'C']
    'A':
      acc:'#'
      notes: ['F', 'C', 'G']
    'E':
      acc: '#'
      notes: ['F', 'C', 'G', 'D']
    'B':
      acc: '#'
      notes: ['F', 'C', 'G', 'D', 'A']
    'F':
      acc: 'b'
      notes: ['B']
    'Bb':
      acc: 'b'
      notes: ['B', 'E']
    'Eb':
      acc: 'b'
      notes: ['B', 'E', 'A']
    'Ab':
      acc: 'b'
      notes: ['B', 'E', 'A','D']
    'Db':
      acc: 'b'
      notes: ['B', 'E', 'A','D','G']
    'Gb':
      acc: 'b'
      notes: ['B', 'E', 'A', 'D', 'G', 'C']

  (note)->
    keys[note]

c_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

indexOfC = binary(indexOf)(c_major)

applyKey = (key)->
  (note)->
    note = take note
    keysig = keySig key
    if note in keysig.notes
      note = note + keysig.acc
    return note

OctIter = (base)->
  -> Math.floor(base++ / 7)

NoteIter = (idx)->
  c_maj = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  len = c_maj.length
  idx = idx or 0
  -> c_maj[idx++ % len]

ScaleIter = (key, oct)->
  keyFilter = applyKey key
  oct = oct or 0
  n = take key
  idx = indexOfC n
  _octIter = OctIter idx
  _noteIter = NoteIter idx
  ->
    keyFilter(_noteIter()) + (_octIter() + oct)

x = ScaleIter 'Db', 2

takeIter = (iter, num)->
  if num > 0
    map [1..num], iter
  else []

z = takeIter x, 8

console.log z
