###
applyTimes, curry1, curry2, flip, rcurry2, mapWith, isNumber, toNumbers, allNumbers, strWithout, dropLast, endsWith, nthWith, withoutNum, has, partial, first, rest, isEmpty, contains

partial, first, rest, isEmpty, contains

TODO: write test for applyTimes
###

_ = require 'lodash-contrib'

applyTimes = (fn)-> (val, n)-> _.reduce [1..n], ((acc)-> fn(acc)), val

isNumber = (value)->
  typeof value == 'number' or value and typeof value == 'object' and toString.call(value) == '[object Number]' or false

isNaN = (value)-> isNumber(value) and value isnt +value

curry1 = (fn)->
  if not _.isFunction fn then throw new TypeError 'Argument of curry1 must be of type function'
  _unary = (a)->
    if a is null then _unary else fn(a)

curry2 =  (fn)->
  if not _.isFunction fn then throw new TypeError 'Arguments to curry2 must be of type function'
  _binary = (a, b)->
    al = arguments.length
    if al is 0
      _binary
    else if al is 1
      curry1((b)-> fn(a, b))
    else
      fn(a, b)

flip = (fn)->
  if not _.isFunction fn then throw new TypeError 'Argument to flip must be of type function'
  (args...)->
    fn.apply null, args.reverse()

rcurry2 = (fn)->
  if not _.isFunction fn then throw new TypeError 'Arguments to rcurry2 must be of type function'
  curry2(flip (fn))

mapWith = rcurry2 _.map

checks = (fns...)->
  (n)->
    _.reduce fns, ((acc, fn)-> fn(n) and acc), true

complement = (fn)->
  (args...)->
    not fn.apply(null, args)

isntNaN = complement isNaN

# isReallyNumber = checks isNumber, isntNaN
isReallyNumber = (n)-> isNumber(n) and not isNaN(n)

toNumbers = mapWith (val)-> +val

allNumbers = (n)->
  if _.isEmpty n then return false
  _.all(toNumbers(n), isReallyNumber)

strWithout = curry2 (rgx, str)->
  if _.isEmpty str then return ''
  if _.isRegExp rgx
    _rgx = new RegExp(rgx.source, 'g')
    if str?
      return str.replace _rgx, ''
  else if _.isString rgx
    idx = 0
    while idx isnt -1
      str = str.replace rgx, ''
      idx = str.indexOf rgx
    return str

dropLast = (str, n = 1)->
  if _.isArray n or not _.isNumber +n then throw new TypeError 'Seccond argument to dropLast must be a number or a quoted number like "1"'
  if not _.isString str then throw new TypeError 'First argument to dropLast must be a string'
  _.first(str, str.length - +n).join ''

arr_equals = (a,b)->
  if a.length isnt b.length then return false
  for v, i in a
    if v isnt b[i] then return false
  return true

endsWith = curry2 (sub, str)->
  if not _.isString(sub) or not _.isString(str) then throw new TypeError 'endsWith expects only string arguments'
  str = str.split ''
  sub = sub.split ''
  x = _.last(str, sub.length)
  arr_equals x, sub

withoutNum = strWithout /\d/g
nthWith = rcurry2 _.nth
has = _.contains
partial = _.partial
first = _.first
rest = _.rest
isEmpty = _.isEmpty
contains = _.contains
compose = _.compose


module.exports =  {
  "applyTimes": applyTimes
  "curry1":    curry1
  "curry2":    curry2
  "flip":      flip
  "rcurry2":   rcurry2
  "mapWith":   mapWith
  "isNumber":  isNumber
  "toNumbers": toNumbers
  "allNumbers":allNumbers
  "strWithout":strWithout
  "dropLast":  dropLast
  "endsWith":  endsWith
  "nthWith":   nthWith
  "withoutNum":withoutNum
  "has":       has
  "partial":   partial
  "first":     first
  "rest":      rest
  "isEmpty":   isEmpty
  "contains":  contains
  "compose":   compose
  }
