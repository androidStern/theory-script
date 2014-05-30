_ = require 'lodash'
helpers = require './test_helpers.coffee'

chai = require 'chai'
chai.should()

{flip, rcurry2, mapWith, toNumbers, allNumbers, strWithout, dropLast, endsWith, nthWith, has} = require '../lib/utils.coffee'

describe 'utils', ->

  describe 'flip', ->
    args = (a,b)-> [a,b]
    flip_args = flip(args)
    err = -> flip(1)
    it 'should return a function when supplied a function', ->
      flip_args.should.be.a 'function'
    it 'should throw a type error when supplied anthing else', ->
      (-> flip(1)).should.throw TypeError
    it 'should flip the arguments given', ->
      [first, seccond] = flip_args('first','seccond')
      first.should.equal 'seccond'
      seccond.should.equal 'first'

  describe 'rcurry2', ->
    it 'should be a function', ->
      rcurry2.should.be.a 'function'
    it 'should return a function when supplied a function', ->
      rcurry2(_.map).should.be.a 'function'
    it 'should return a function of length two when supplied a function', ->
      rcurry2(_.map).length.should.equal 2
    it 'should throw a type error when suppied anything else', ->
      (-> rcurry2(1)).should.throw TypeError
    it 'should return a function of length one after its first argument is supplied', ->
      curried_map = rcurry2(_.map)
      curried_map.length.should.equal 2
      curried_map(-> 1).length.should.equal 1
    describe 'when applied to _.map', ->
      curried_map = rcurry2(_.map)
      describe 'when _.identity is its first argument', ->
        it 'should return an array when called with no args', ->
          map_id = curried_map(_.identity)
          list = [0,0,0]
          map_id().should.be.an 'array'
        it 'should return an array of the same length as its argument', ->
          map_id = curried_map(_.identity)
          list = [0,0,0]
          (map_id(list).length is list.length).should.be.true
        it 'should return an array of the same elements as its argument', ->
          map_id = curried_map(_.identity)
          list = [0,1,2]
          map_id(list)[0].should.equal 0
          map_id(list)[1].should.equal 1
          map_id(list)[2].should.equal 2

  describe 'mapWith', ->
    it 'should be a function', ->
      mapWith.should.be.a 'function'
    it 'should return a function when given 1 argument', ->
      mapWith(_.identity).should.be.a 'function'
    it 'should return a function of length 1 when given 1 argument', ->
      (mapWith(-> 1)).length.should.equal 1
    it 'should return an array of the same length as provided', ->
      mapWith(_.identity)([1,2,3]).length.should.equal 3
    it 'should accept evaluate to the same value as _.map provided the smae arguments but flipped', ->
      inc = (a)-> a + 1
      list = [1,2,3]
      helpers.arr_equals(_.map(list, inc), mapWith(inc, list)).should.be.true

  describe 'toNumbers', ->
    it 'should return an array of the same length as provided', ->
      toNumbers([1,2,3]).length.should.equal 3
    it 'should return NaN for a non coercible string', ->
      _.isNaN(toNumbers(['a'])[0]).should.true
    it 'should correctly coerce strings to numbers', ->
      helpers.arr_equals(toNumbers(['0','1','2']), [0,1,2]).should.be.true

  describe 'allNumbers', ->
    it 'should return a boolean', ->
      allNumbers(['a',2,3]).should.be.a 'boolean'
    it 'should correctly coerce string numbers', ->
      allNumbers(['1']).should.be.true
    it 'should fail when given an empty list', ->
      allNumbers([]).should.be.false
    it 'should handle a mix of string and literal numbers', ->
      allNumbers(['1',1]).should.be.true

  describe 'strWithout', ->
    it 'should curry its first argument', ->
      strWithout(/\d/g).should.be.a 'function'
      strWithout('a')('a').should.be.a 'string'
    it 'should return a string if given a string as it seccond argument', ->
      strWithout('a', 'ab').should.be.a 'string'
    it 'should remove all matching substrings', ->
      strWithout('a', 'aaa').should.be.empty
      strWithout(/\d/)('12ab').length.should.equal 2
    it 'should remove all matching regexps', ->
      strWithout(/\d/)('123').should.be.empty

  describe 'dropLast', ->
    describe 'when provided bad arguments', ->
      it 'should throw a type error if its first argument isnt a string', ->
        (-> dropLast(1,1)).should.throw TypeError
      it 'should throw a type error if its seccond argument cant be coerced into a num', ->
        (-> dropLast('012', [])).should.throw TypeError
      it 'should throw a type error if its seccond argument is an array', ->
        (-> dropLast('', [])).should.throw TypeError
    describe 'when provided good args', ->
      it 'should return a string with length strlen - n', ->
        str = helpers.gen_kinda_random_string()
        n = helpers.getRandomArbitrary(0,1000)
        max = if str.length - n < 0 then 0 else str.length - n
        dropLast(str,n).length.should.be.equal max
      it 'should return a substring of the origional', ->
        str = helpers.gen_kinda_random_string()
        n = helpers.getRandomArbitrary(0,1000)
        str.indexOf(dropLast(str, n)).should.not.equal -1

  describe 'endsWith', ->
    describe 'when given bad args', ->
      it 'should fail if first args length is greater than seccond args length', ->
        [long, short] = helpers.gen_increasing_length_str_pair()
        endsWith(long, short).should.be.false
      it 'should fail if first string is not a substring of seccond', ->
        [str1,str2] = helpers.gen_non_substr_pair()
        endsWith(str1, str2).should.be.false
      it 'should throw a type error if passed anything but strings', ->
        (-> endsWith(1,'a')).should.throw TypeError
        (-> endsWith('123',[])).should.throw TypeError

    describe 'when given good args', ->
      it 'should succeede when str 1 is substring at end of string 2', ->
        endsWith('23', '123').should.be.true
        endsWith('ab12', 'askfhekd7ab12').should.be.true
      it 'should return a boolean', ->
        str1 = helpers.gen_kinda_random_string()
        str2 = helpers.gen_kinda_random_string()
        endsWith(str1,str2).should.be.a 'boolean'

  describe 'nthWith', ->
      it 'should return a function when supplied a number', ->
        nthWith(1).should.be.a 'function'
      it 'should curry its first argument', ->
        nthWith(1)([0,1,2]).should.equal 1
      it 'should return undefined when index is out of range', ->
        chai.expect(nthWith(20, [1,1,2,3])).to.be.undefined
      it 'should return the nth element of the array passed', ->
        nthWith(2)(['a','b','c']).should.equal 'c'
