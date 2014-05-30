note_helpers = require "./note_helpers.coffee"
utils = require "./utils.coffee"

toMajScale = (note)-> note_helpers.keys(utils.withoutNum(note))

OctIter  = (i)-> -> Math.floor(i++ / 7)

NoteIter = (scale, i)-> -> utils.withoutNum utils.nthWith(i++ % 7, scale)


module.exports = (note)->
  scale = toMajScale(note)
  oct = note_helpers.getOct(note)
  _noteIter = NoteIter(scale, 0)
  oct_start_point = note_helpers.cOffset note
  _octIter = OctIter(oct_start_point)
  -> _noteIter() + (_octIter() + oct)
