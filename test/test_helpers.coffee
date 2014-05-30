_ = require 'lodash'

# arr_equals, getRandomArbitrary, rand_string, gen_non_substr_pair, gen_kinda_random_string, gen_increasing_length_str_pair
arr_equals = (a,b)->
  if a.length isnt b.length then return false
  for v, i in a
    if v isnt b[i] then return false
  return true

getRandomArbitrary = (min, max)->
  return Math.random() * (max - min) + min

rand_string = ->
  str = Math.random().toString(36)
  len = str.length
  res = ''
  while res.length is 0
    res = str.substring(getRandomArbitrary(0,len))
  return res


gen_kinda_random_string = ->
  str = rand_string()
  valid_chars = ['a','e','i','o','u', 'a', 'b','c','d','e','f']
  res = _.filter str, (e)->
    e in valid_chars
  res = res.join ''
  if res.length > 2
    return res
  else
    return gen_kinda_random_string()

gen_non_substr_pair = ->
  first = gen_kinda_random_string()
  sec = gen_kinda_random_string()
  sec_contains_first = sec.indexOf first
  if sec.indexOf first is -1
    return [first, sec]
  else
    return gen_diff_srings_of_inc_length()



gen_increasing_length_str_pair = ->
  first = gen_kinda_random_string()
  sec = gen_kinda_random_string()
  if first.length > sec.length
    [first, sec]
  else
    return gen_increasing_length_str_pair()


module.exports = {arr_equals, getRandomArbitrary, rand_string, gen_non_substr_pair, gen_kinda_random_string, gen_increasing_length_str_pair}
