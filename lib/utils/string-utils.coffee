_ = require 'lodash'
{curry2} = require 'fn-utils'

capitalize = (word)-> word[0].toUpperCase() + word[1..-1].toLowerCase()

without = curry2 (rgx, str)->
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

withoutNum = without /\d/g

endsWith = curry2 (sub, str)->
	if not _.isString(sub) or not _.isString(str) then throw new TypeError 'endsWith expects only string arguments'
	str = str.split ''
	sub = sub.split ''
	x = _.last(str, sub.length)
	arr_equals x, sub

dropLast = (str, n = 1)->
	if not _.isNumber +n then throw new TypeError 'Seccond argument to dropLast must be a number or a quoted number like "1"'
	if not _.isString str then throw new TypeError 'First argument to dropLast must be a string'
	_.first(str, str.length - +n).join ''

module.exports =
	capitalize: capitalize
	without: without
	withoutNum: withoutNum
	endsWith: endsWith
	dropLast: dropLast
