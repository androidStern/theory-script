/*=========================== UTILS ===========================
TODO:
  - document functions
  - write tests
=============================================================*/
_ = require 'lodash-contrib'

{filter
find-indices
tail
zip
is-type
is-it-NaN
Str
apply} = require 'prelude-ls'

const err = -> 0

module.exports.err = err

/****************************************************************
  TO ARR
*/

to-arr = -> [].slice.call(arguments)

copy = -> [i for i in it]

/****************************************************************
  IS TYPES
*/

is-string = _.isString

is-array = is-type 'Array'

is-number = -> is-type('Number', it) and not is-it-NaN(it)

is-func = (fn)-> typeof fn is 'function'

is-args = _.isArguments

is-regex = _.isRegExp

isnt-empty = -> if it.length? then  it.length isnt 0


chars = -> it.split ""
unchars = -> _.toArray(arguments) |> _.flatten |> (.join "")

/****************************************************************
  MAP WITH
*/

all = _.all
map = _.map
at = _.at
filter = _.filter
mapcat = _.mapcat
split-at = _.splitAt
uniq = _.uniq
head = _.head
any = _.any
rest = _.rest


map-with = _.rcurry2 map
all-with = _.rcurry2 all
at-with = _.rcurry2 at
filter-with = _.rcurry2 filter
mapcat-with = _.rcurry2 mapcat
split-with = _.rcurry2 split-at

/****************************************************************
  APPLY
*/

apply = (fn)->
  fn.apply null, rest arguments

/****************************************************************
  ALL WITHS
*/

all-strings = all-with is-string

all-arrays = all-with is-array

all-numbers = all-with is-number

/****************************************************************
  DISPATCH
*/

dispatch = ->
  funs = _.toArray(arguments)
  size = funs.length
  (target)->
    args = rest(arguments)
    for i in [0 til size]
      fun = funs[i]
      ret = fun.apply(fun, _.cons(target, args))
      if ret? then return ret

/****************************************************************
  GUARD
*/
guard = (pred, fn)-->
  bound-args = rest _.toArray(arguments), 2
  ->
    args = _.toArray arguments
    if isnt-empty bound-args then args = _.cat bound-args, args
    if apply(pred, args) then apply(fn, args) else undefined

guard-str = guard is-string
guard-arr = guard is-array
/****************************************************************
IS LEN ONE
*/

str-is-len-one = guard-str -> it.length is 1

array-is-len-one = guard-arr -> it.length is 1

is-len-one = dispatch str-is-len-one, array-is-len-one

/****************************************************************
  S FORM
*/

s-form = (l)-> if is-func l.0 then apply(l.0, tail(l)) else l

/****************************************************************
  ZIP APPLY
*/

zip-apply = (l1,l2)-> zip l1, l2 |> map-with(s-form)

/****************************************************************
  REMOVE AT INDICES
*/

a-remove-at-indices = (list, idxs)->
  _list = copy list
  idxs = rest(arguments) |> filter-with(-> it < _list.length) |> _.flatten
  id-gen = do -> z = {}; -> z
  replace-with-id = (list, idx)->
    list[idx] = id-gen!
    return list
  _.reduce(idxs, replace-with-id, _list) |> filter-with (-> it isnt id-gen!)

/*console.log remove-at-indices [0,1,2,3], 1*/
console.log guard-str(->)([])
s-remove-at-indices = guard-str (str)->
  a-remove-at-indices( chars(str), rest(arguments) ) |> unchars

console.log s-remove-at-indices "asdf", 1
/****************************************************************
  REMOVE AT INDEX
*/

remove-at-index = (list, idx)->
  if idx < list.length then list |> split-with(idx) |> (-> _.cat it.0, tail it.1) else list

/****************************************************************
  WITHOUT
*/

str-without = guard-str (str)->
  chars = rest(arguments)
  rep-str = (s,c)-> s.replace c, ''
  _.reduce(rest(arguments), rep-str, str)

array-without = guard-arr _.without

without = dispatch str-without, array-without

without-num = _.partialRight without, /\d/g

/****************************************************************
  ALL SAME LENGTH
*/

all-same-length = -> _.toArray(arguments) |> map-with (.length) |> uniq |> (.length is 1)
/****************************************************************
  LIST EQUALS
*/

list-equals = (a,b)->
  args = _.toArray arguments
  if not any([all-strings(args), all-arrays(args)]) or not all-same-length args then return false
  len = _.first(args).length
  for i in [0 til len]
    at-n = at-with i
    vals = args |> mapcat-with (-> at-n it) |> uniq |> (.length is 1)
    if not vals then return false
  true

/****************************************************************
  ENDS WITH
*/
str-ends-with = guard-str (a,b)--> Str.drop((b.length - a.length), b) is a

list-ends-with = guard-arr (a,b)->
  num-to-drop = b.length - a.length
  if num-to-drop < 0 then false else list-equals a, _.drop(b, num-to-drop)

ends-with = dispatch list-ends-with, str-ends-with

/****************************************************************
  DROP LAST N
*/

s-drop-last-n = guard-str (str, n)--> Str.slice 0, (str.length - n), str

a-drop-last-n = guard-arr (list, n)-> head list, (list.length - n)

drop-last-n = _.rcurry2 dispatch(a-drop-last-n, s-drop-last-n)

drop-last = drop-last-n 1

/****************************************************************
  TO NUMBERS
*/

to-number = ->
  if is-string it and not Str.empty it then Number it
  else if is-number it then it

to-numbers = map-with to-number

/****************************************************************
  IS ALL NUMS
*/

a-is-all-nums = guard-arr (list)-> all to-numbers(list), is-number
s-is-all-nums = guard-str (str)-> str.split('') |> a-is-all-nums

is-all-nums = dispatch s-is-all-nums, a-is-all-nums

/********************************************************************************
                              MODULE EXPORTS
********************************************************************************/
module.exports.str = do
  without: without
  ends-with: ends-with
  drop-last: drop-last
  /*  guard-str: _guard-str*/
  is-number: is-number

module.exports.list = do
  is-all-numbers: is-all-nums
  is-len-one: is-len-one
  to-numbers: to-numbers
