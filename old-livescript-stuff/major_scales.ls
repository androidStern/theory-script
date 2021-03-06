{without-oct} = require './note_utils'
{err} = require './utils'
{capitalize} = require('prelude-ls')

const _keys =
  'C': <[C0 D0 E0 F0 G0 A0 B0 ]>
  'G':  <[G0 A0 B0 C1 D1 E1 F#1 ]>
  'D':  <[D0 E0 F#0 G0 A0 B0 C#1 ]>
  'A':  <[A0 B0 C#1 D1 E1 F#1 G#1 ]>
  'E':  <[E0 F#0 G#0 A0 B0 C#1 D#1 ]>
  'B':  <[B0 C#1 D#1 E1 F#1 G#1 A#1 ]>
  'F':  <[F0 G0 A0 Bb0 C1 D1 E1 ]>
  'C#':  <[C#0 D#0 E#0 F#0 G#0 A#0 B#0 ]>
  'G#':  <[G#0 A#0 B#0 C#1 D#1 E#1 F##1 ]>
  'D#':  <[D#0 E#0 F##0 G#0 A#0 B#0 C##1 ]>
  'A#':  <[A#0 B#0 C##1 D#1 E#1 F##1 G##1 ]>
  'E#':  <[E#0 F##0 G##0 A#0 B#0 C##1 D##1 ]>
  'B#':  <[B#0 C##1 D##1 E#1 F##1 G##1 A##1 ]>
  'F#':  <[F#0 G#0 A#0 B0 C#1 D#1 E#1 ]>
  'Bb':  <[Bb0 C1 D1 Eb1 F1 G1 A1 ]>
  'Eb':  <[Eb0 F0 G0 Ab0 Bb0 C1 D1 ]>
  'Ab':  <[Ab0 Bb0 C1 Db1 Eb1 F1 G1 ]>
  'Db':  <[Db0 Eb0 F0 Gb0 Ab0 Bb0 C1 ]>
  'Gb':  <[Gb0 Ab0 Bb0 Cb1 Db1 Eb1 F1 ]>
  'Cb':  <[Cb0 Db0 Eb0 Fb0 Gb0 Ab0 Bb0 ]>
  'Fb':  <[Fb0 Gb0 Ab0 Bbb0 Cb1 Db1 Eb1 ]>

to-maj-scale = -> _keys[ it |> without-oct |> capitalize ]

console.log to-maj-scale 'Eb#11'
