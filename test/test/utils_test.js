var allNumbers, chai, dropLast, endsWith, flip, has, helpers, mapWith, nthWith, rcurry2, strWithout, toNumbers, _, _ref;

_ = require('lodash');

helpers = require('./test_helpers.coffee');

chai = require('chai');

chai.should();

_ref = require('../lib/utils.coffee'), flip = _ref.flip, rcurry2 = _ref.rcurry2, mapWith = _ref.mapWith, toNumbers = _ref.toNumbers, allNumbers = _ref.allNumbers, strWithout = _ref.strWithout, dropLast = _ref.dropLast, endsWith = _ref.endsWith, nthWith = _ref.nthWith, has = _ref.has;

describe('utils', function() {
  describe('flip', function() {
    var args, err, flip_args;
    args = function(a, b) {
      return [a, b];
    };
    flip_args = flip(args);
    err = function() {
      return flip(1);
    };
    it('should return a function when supplied a function', function() {
      return flip_args.should.be.a('function');
    });
    it('should throw a type error when supplied anthing else', function() {
      return (function() {
        return flip(1);
      }).should["throw"](TypeError);
    });
    return it('should flip the arguments given', function() {
      var first, seccond, _ref1;
      _ref1 = flip_args('first', 'seccond'), first = _ref1[0], seccond = _ref1[1];
      first.should.equal('seccond');
      return seccond.should.equal('first');
    });
  });
  describe('rcurry2', function() {
    it('should be a function', function() {
      return rcurry2.should.be.a('function');
    });
    it('should return a function when supplied a function', function() {
      return rcurry2(_.map).should.be.a('function');
    });
    it('should return a function of length two when supplied a function', function() {
      return rcurry2(_.map).length.should.equal(2);
    });
    it('should throw a type error when suppied anything else', function() {
      return (function() {
        return rcurry2(1);
      }).should["throw"](TypeError);
    });
    it('should return a function of length one after its first argument is supplied', function() {
      var curried_map;
      curried_map = rcurry2(_.map);
      curried_map.length.should.equal(2);
      return curried_map(function() {
        return 1;
      }).length.should.equal(1);
    });
    return describe('when applied to _.map', function() {
      var curried_map;
      curried_map = rcurry2(_.map);
      return describe('when _.identity is its first argument', function() {
        it('should return an array when called with no args', function() {
          var list, map_id;
          map_id = curried_map(_.identity);
          list = [0, 0, 0];
          return map_id().should.be.an('array');
        });
        it('should return an array of the same length as its argument', function() {
          var list, map_id;
          map_id = curried_map(_.identity);
          list = [0, 0, 0];
          return (map_id(list).length === list.length).should.be["true"];
        });
        return it('should return an array of the same elements as its argument', function() {
          var list, map_id;
          map_id = curried_map(_.identity);
          list = [0, 1, 2];
          map_id(list)[0].should.equal(0);
          map_id(list)[1].should.equal(1);
          return map_id(list)[2].should.equal(2);
        });
      });
    });
  });
  describe('mapWith', function() {
    it('should be a function', function() {
      return mapWith.should.be.a('function');
    });
    it('should return a function when given 1 argument', function() {
      return mapWith(_.identity).should.be.a('function');
    });
    it('should return a function of length 1 when given 1 argument', function() {
      return (mapWith(function() {
        return 1;
      })).length.should.equal(1);
    });
    it('should return an array of the same length as provided', function() {
      return mapWith(_.identity)([1, 2, 3]).length.should.equal(3);
    });
    return it('should accept evaluate to the same value as _.map provided the smae arguments but flipped', function() {
      var inc, list;
      inc = function(a) {
        return a + 1;
      };
      list = [1, 2, 3];
      return helpers.arr_equals(_.map(list, inc), mapWith(inc, list)).should.be["true"];
    });
  });
  describe('toNumbers', function() {
    it('should return an array of the same length as provided', function() {
      return toNumbers([1, 2, 3]).length.should.equal(3);
    });
    it('should return NaN for a non coercible string', function() {
      return _.isNaN(toNumbers(['a'])[0]).should["true"];
    });
    return it('should correctly coerce strings to numbers', function() {
      return helpers.arr_equals(toNumbers(['0', '1', '2']), [0, 1, 2]).should.be["true"];
    });
  });
  describe('allNumbers', function() {
    it('should return a boolean', function() {
      return allNumbers(['a', 2, 3]).should.be.a('boolean');
    });
    it('should correctly coerce string numbers', function() {
      return allNumbers(['1']).should.be["true"];
    });
    it('should fail when given an empty list', function() {
      return allNumbers([]).should.be["false"];
    });
    return it('should handle a mix of string and literal numbers', function() {
      return allNumbers(['1', 1]).should.be["true"];
    });
  });
  describe('strWithout', function() {
    it('should curry its first argument', function() {
      strWithout(/\d/g).should.be.a('function');
      return strWithout('a')('a').should.be.a('string');
    });
    it('should return a string if given a string as it seccond argument', function() {
      return strWithout('a', 'ab').should.be.a('string');
    });
    it('should remove all matching substrings', function() {
      strWithout('a', 'aaa').should.be.empty;
      return strWithout(/\d/)('12ab').length.should.equal(2);
    });
    return it('should remove all matching regexps', function() {
      return strWithout(/\d/)('123').should.be.empty;
    });
  });
  describe('dropLast', function() {
    describe('when provided bad arguments', function() {
      it('should throw a type error if its first argument isnt a string', function() {
        return (function() {
          return dropLast(1, 1);
        }).should["throw"](TypeError);
      });
      it('should throw a type error if its seccond argument cant be coerced into a num', function() {
        return (function() {
          return dropLast('012', []);
        }).should["throw"](TypeError);
      });
      return it('should throw a type error if its seccond argument is an array', function() {
        return (function() {
          return dropLast('', []);
        }).should["throw"](TypeError);
      });
    });
    return describe('when provided good args', function() {
      it('should return a string with length strlen - n', function() {
        var max, n, str;
        str = helpers.gen_kinda_random_string();
        n = helpers.getRandomArbitrary(0, 1000);
        max = str.length - n < 0 ? 0 : str.length - n;
        return dropLast(str, n).length.should.be.equal(max);
      });
      return it('should return a substring of the origional', function() {
        var n, str;
        str = helpers.gen_kinda_random_string();
        n = helpers.getRandomArbitrary(0, 1000);
        return str.indexOf(dropLast(str, n)).should.not.equal(-1);
      });
    });
  });
  describe('endsWith', function() {
    describe('when given bad args', function() {
      it('should fail if first args length is greater than seccond args length', function() {
        var long, short, _ref1;
        _ref1 = helpers.gen_increasing_length_str_pair(), long = _ref1[0], short = _ref1[1];
        return endsWith(long, short).should.be["false"];
      });
      it('should fail if first string is not a substring of seccond', function() {
        var str1, str2, _ref1;
        _ref1 = helpers.gen_non_substr_pair(), str1 = _ref1[0], str2 = _ref1[1];
        return endsWith(str1, str2).should.be["false"];
      });
      return it('should throw a type error if passed anything but strings', function() {
        (function() {
          return endsWith(1, 'a');
        }).should["throw"](TypeError);
        return (function() {
          return endsWith('123', []);
        }).should["throw"](TypeError);
      });
    });
    return describe('when given good args', function() {
      it('should succeede when str 1 is substring at end of string 2', function() {
        endsWith('23', '123').should.be["true"];
        return endsWith('ab12', 'askfhekd7ab12').should.be["true"];
      });
      return it('should return a boolean', function() {
        var str1, str2;
        str1 = helpers.gen_kinda_random_string();
        str2 = helpers.gen_kinda_random_string();
        return endsWith(str1, str2).should.be.a('boolean');
      });
    });
  });
  return describe('nthWith', function() {
    it('should return a function when supplied a number', function() {
      return nthWith(1).should.be.a('function');
    });
    it('should curry its first argument', function() {
      return nthWith(1)([0, 1, 2]).should.equal(1);
    });
    it('should return undefined when index is out of range', function() {
      return chai.expect(nthWith(20, [1, 1, 2, 3])).to.be.undefined;
    });
    return it('should return the nth element of the array passed', function() {
      return nthWith(2)(['a', 'b', 'c']).should.equal('c');
    });
  });
});
