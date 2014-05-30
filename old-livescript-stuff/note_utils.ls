/*=========================== NOTE UTILS ===========================
TODO:
  -implament is-note: (str)-> bool
==================================================================*/

{drop-last
ends-with
capitalize
without
guard-str
is-number} = require('./utils').str

{to-numbers} = require('./utils').list

{err} = require('./utils')

{is-type
filter} = require 'prelude-ls'

{take
capitalize
chars
unchars} = require('prelude-ls').Str

/****************HELPERS*****************/
_sharp = -> \#
_flat = -> 'b'

_ends-with-sharp = ends-with "#"
_ends-with-flat = ends-with "b"

module.exports._ends-with-sharp = _ends-with-sharp
module.exports._ends-with-flat = _ends-with-flat


/****************************************************************
  WITHOUT OCT

  @sig:     (str)-> str
  @desc:    returns a copy of its input with any numbers removed
  @ex:      without-oct('C2') #=> 'C'
*/

without-oct = without /\d/g

/****************************************************************
  WITHOUT SHARP

  @sig:   (str)-> str
  @desc:  returns a copy of its input with any `#`s removed
  @ex:    without-sharp('C#2') #=> 'C2'
*/

without-sharp = without /#/g

/****************************************************************
  WITHOUT FLAT

  @sig:  (str)-> str
  @desc: returns a copy of its input with any `b`s removed
  @ex:   without-flat('Cb2') #=> 'C2'
*/

without-flat = without /b/g

/****************************************************************
  BASE NOTE
  @sig: (str)-> str
  @desc: returns a copy of its input without any `b`s,`#`s, or numbers
  @ex: base-note('D#11') #=> 'D'
*/

base-note = guard-str -> it |> capitalize |> without-oct |> without-sharp |> without-flat

/****************************************************************
  ADD SHARP
  @sig:   (str)-> str
  @desc:  returns a copy of its input with a '#' appended to the end
  @ex:    add-sharp('D#') #=> 'D##'
  @NOTE:  meant for internal use. Doesn't handle complex notes.
          for example: add-sharp `C#11` will return `C#11#`
*/

add-sharp = guard-str -> it + _sharp!

/****************************************************************
  ADD FLAT
  @sig:    (str)-> str
  @desc:   returns a copy of its input with a 'b' appended to the end
  @ex:     add-flat('D') #=> 'Db'
  @NOTE:   meant for internal use. Doesn't handle complex notes.
           for example: add-flat `C#` will return `C#b`
*/
add-flat = guard-str -> it + _flat!

/****************************************************************
  REMOVE SHARP
  @sig:    (str)-> str
  @desc:   returns a copy of its input with the traiing `#` removed if there is one
  @ex:     remove-sharp('D#') #=> 'D'
*/
remove-sharp = guard-str -> if _ends-with-sharp it then drop-last it else it


/****************************************************************
  REMOVE FLAT
  @sig:   (str)-> str
  @desc:  returns a copy of its input with one trailng `b` removed if there is one
  @ex:    remove-flat('Dbb') #=> 'Db'
*/

remove-flat = guard-str -> if _ends-with-flat it then drop-last it else it

/****************************************************************
  OCT OF
  @sig:  (str)-> number
  @desc: returns the number portion of its input or 0
  @ex:   oct-of('Db10') #=> 10
*/
oct-of = guard-str ->
  d = it.match(/\d/g)
  if d? then Number(d.join("")) else err!

/****************************************************************
  IS NOTE
*/

_first = take 1

in-c = guard-str -> it |> capitalize |> (in <[C D E F G A B]>)

has-note-name = guard-str -> it |> _first |> in-c

/*console.log chars 'c c 2'*/


only-numbers = filter is-number



get-numbers = ->
  if is-type 'String', it
    n = it.match /\d/g
    if is-type 'Array', n
      unchars n
  else
    ""

numbers-only-at-end = -> it |> chars |> to-numbers |> filter is-number |> (.length)

/*console.log numbers-only-at-end '2ac2'*/

is-note = (str)->
  # starts with a valid note name

  # if there are numbers, they must be at the end



/****************************************************************
  MODULE.EXPORTS
*/
for own let k,v of {
  without-oct
  without-sharp
  without-flat
  base-note
  add-sharp
  add-flat
  remove-sharp
  remove-flat
  oct-of
  is-note
  in-c
  has-note-name
  }
  module.exports[k] = v
