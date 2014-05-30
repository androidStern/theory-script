/*excpectThat = require('expectThat.mocha')

{
  _ends-with-sharp
  _ends-with-flat
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
  has-note-name} = require '../lib/note_utils'

describe 'note_utils helpers', ->

  # Ends With Sharp
  expectThat -> ("" |> _ends-with-sharp).should be false
  expectThat -> ("C#" |> _ends-with-sharp).should be true
  expectThat -> (["C", "#"] |> _ends-with-sharp).should be false

  # Ends With Flat
  expectThat -> ("" |> _ends-with-flat).should be false
  expectThat -> ("Bb" |> _ends-with-flat).should be true
  expectThat -> ("B" |> _ends-with-flat).should be false

  # Without Oct
  expectThat -> ( 'C12' |> without-oct).should be 'C'
  expectThat -> ( '123' |> without-oct).should be ''
  expectThat -> ( 1 |> without-oct).should be 0

  # Without Sharp
  expectThat -> ( "A#" |> without-sharp).should be "A"
  expectThat -> ( 1 |> without-sharp).should be 0
  expectThat -> ( 'A#b#' |> without-sharp).should be 'Ab'

  # Without Flat
  expectThat -> ( "bb" |> without-flat).should be ""
  expectThat -> ( 6 |> without-flat).should be 0
  expectThat -> ( 'A#b#' |> without-flat).should be 'A##'

  # Base Note
  expectThat -> ( 1 |> base-note).should be 0
  expectThat -> ( "1C#" |> base-note).should be 'C'
  expectThat -> ( "1#" |> base-note).should be ''

  # ADD SHARP
  expectThat -> ( '#' |> add-sharp).should be '##'
  expectThat -> ( [] |> add-sharp).should be 0
  expectThat -> ( 'G' |> add-sharp).should be 'G#'

  # ADD FLAT
  expectThat -> ( 'Cb' |> add-flat).should be 'Cbb'
  expectThat -> ( 1 |> add-flat).should be 0
  expectThat -> ( {} |> add-flat).should be 0

  # REMOVE SHARP
  expectThat -> ( 1 |> remove-sharp).should be 0
  expectThat -> ( 'C##' |> remove-sharp).should be 'C#'
  expectThat -> ( 'D' |> remove-sharp).should be 'D'

  # REMOVE FLAT
  expectThat -> ( 200 |> remove-flat).should be 0
  expectThat -> ( 'Bbb' |> remove-flat).should be 'Bb'
  expectThat -> ( 'B' |> remove-flat).should be 'B'

  # OCT OF
  expectThat -> ( 1 |> oct-of).should be 0
  expectThat -> ( "D" |> oct-of).should be 0
  expectThat -> ( "12" |> oct-of).should be 12
  expectThat -> ( "C12" |> oct-of).should be 12

  # IN C
  expectThat -> ( 'C' |> in-c).should be true
  expectThat -> ( 'C#' |> in-c).should be false

  # FIRST IN C
  expectThat -> ('db'|> has-note-name).should be true
  expectThat -> ('A#'|> has-note-name).should be true
  expectThat -> ('c'|> has-note-name).should be true
  expectThat -> ('b'|> has-note-name).should be true
  expectThat -> (' b'|> has-note-name).should be false
  expectThat -> ('hc'|> has-note-name).should be false
  expectThat -> (''|> has-note-name).should be false
  expectThat -> (1|> has-note-name).should be false*/

  # IS NOTE
/*  expectThat -> (1 |> is-note).should be false
  expectThat -> ('C1#' |> is-note).should be false
  expectThat -> ('H' |> is-note).should be false
  expectThat -> ('' |> is-note).should be false
  expectThat -> ([] |> is-note).should be false
  expectThat -> ('H' |> is-note).should be false
  expectThat -> ('Gb#' |> is-note).should be false
  expectThat -> ('Gb#1' |> is-note).should be false
  expectThat -> ('Gb#1' |> is-note).should be false
  expectThat -> ('C#1' |> is-note).should be true
  expectThat -> ('cb' |> is-note).should be true
  expectThat -> ('bb' |> is-note).should be true
  expectThat -> ('bB' |> is-note).should be false*/
