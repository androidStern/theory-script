{binary, unary, flip} = require('allong.es').es

_ = require 'lodash-contrib'

all = binary _.all
at = binary _.at
filter = binary _.filter
mapcat = binary _.mapcat
find = binary _.find
find-last = binary _.findLast
reduce = _.reduce
group-by = binary _.groupBy
index-by = binary _.indexBy

split-at = binary _.splitAt

uniq = _.uniq

head = _.head

any = _.any

rest = _.rest

cat = _.cat

len = _.size

first = _.first

reduce = _.reduce

size = _.size

apply = (fn)->
  fn.apply null, rest arguments

copy = -> [i for i in it]

unary = (fn)-> (a)-> fn.apply null, [a]

binary = (fn)-> (a,b)-> fn.apply null, [a,b]

flip2 = (fn)-> (a,b)--> fn.apply null, [b,a]

is-string = _.isString
is-array = _.isArray
is-number = -> _.isNumber it and not _.isNaN it
is-function = (fn)-> _.isFunction
is-args = _.isArguments
is-regex = _.isRegExp
is-seq = (coll)-> is-array coll or is-string coll
isnt-empty = -> if it.length? then  it.length isnt 0

all-with = flip2 all
map-with = flip2 map
at-with = flip2 at
filter-with = flip2 filter
mapcat-with = flip2 mapcat
split-at-with = flip2 split-at

all-strings = all-with is-string
all-arrays = all-with is-array

all-same-length = -> _.toArray(arguments) |> map-with size |> uniq |> (.length is 1)

chars = _.explode
unchars = _.implode

index-of = (list, e)-> list.indexOf e

indices-of = (list, el)->
  idxs = []
  for k,i in list
    if k is el then idxs.push i
  return idxs

list-equals = (a,b)->
  args = _.toArray arguments
  if not any(all-arrays(args)) or not all-same-length(args)
    return false
  len = _.first(args).length
  for i in [0 til len]
    at-n = at-with i
    vals = args |> mapcat-with (-> at-n it) |> uniq |> (.length is 1)
    if not vals then return false
  true


starts-with = (list, sub)->
  for v,i in sub
    if list[i] isnt v then return false
  return true

is-sub-seq = (seq, sub)->
  if not is-seq seq then throw new TypeError
  if not sub.length? or sub.length is 0 then throw new TypeError
  if is-array seq
    indices = indices-of seq, first(sub)
    for i in indices
      if starts-with rest(seq, i), sub then return true
  return false

strContains = (str, search)->
  if not is-string str then throw new TypeError
  str.indexOf search isnt -1

to-number = ->
  if is-string it and isnt-empty it then Number it
  else if is-number it then it

drop-last = (coll, num)->
  if not is-seq coll then throw new TypeError
  c = first(coll, (size(coll) - num))
  if is-string coll then unchars(c) else c


funs = {apply,copy,unary,binary,flip2,is-string,is-array,
is-number,is-function,is-args,is-regex,is-seq,
isnt-empty,all-with,map-with,at-with,filter-with,
mapcat-with,split-at-with,all-strings,all-arrays,
chars,unchars,index-of,indices-of,list-equals,
starts-with,is-sub-seq,strContains,to-number,drop-last}

for own let k,v of funs
  module.exports[k] = v
