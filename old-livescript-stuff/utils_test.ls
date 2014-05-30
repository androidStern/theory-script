/*excpectThat = require 'expectThat.mocha'
{without
ends-with
cap-first
drop-last
guard-str} = require('../lib/utils').str

{is-all-numbers
is-len-one} = require('../lib/utils').list

{err} = require('../lib/utils')

describe 'utils helpers', ->
  # GUARD STR
  _id = -> it
  expectThat -> ("" |> guard-str(_id)).should be ''
  expectThat -> (1 |> guard-str(_id)).should be err!
  # IS LEN ONE
  expectThat -> ("" |> is-len-one).should be false
  expectThat -> ("[1]" |> is-len-one).should be false
  expectThat -> ("asd" |> is-len-one).should be false
  expectThat -> ([1] |> is-len-one).should be true
  expectThat -> ([] |> is-len-one).should be false
  # IS ALL NUMBERS
  expectThat -> (""|> is-all-numbers).should be false*/
