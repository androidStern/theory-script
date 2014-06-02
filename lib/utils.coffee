{ncurry, curry, partial, flip, curry2, binary} = require "fn-utils"
{mapWith} = require 'flipped'
###
applyTimes, isNumber, toNumbers, allNumbers, strWithout, dropLast, endsWith, nthWith, withoutNum
TODO: write test for applyTimes
###

_ = require 'lodash-contrib'

applyTimes = (fn)-> (val, n)-> _.reduce [1..n], ((acc)-> fn(acc)), val

isNumber = (value)->
  typeof value == 'number' or value and typeof value == 'object' and toString.call(value) == '[object Number]' or false

isNaN = (value)-> isNumber(value) and value isnt +value

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


arr_equals = (a,b)->
  if a.length isnt b.length then return false
  for v, i in a
    if v isnt b[i] then return false
  return true



module.exports =
  "applyTimes": applyTimes
  "isNumber":  isNumber
  "toNumbers": toNumbers
  "allNumbers":allNumbers
