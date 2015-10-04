'use strict';

var utils = require('../../src/lib/utils');

describe('Utils', () => {
  describe('#forEach', () => {
    it('should be a function', () => {
      assert.typeOf(utils.forEach, 'function', 'forEach should be a function');
    });

    it('should iterate over an array', () => {
      var numbers = [1, 2, 3, 4, 5];
      var actualResult = 0;
      var expectedResult = 15;

      utils.forEach(numbers, (number) => {
        actualResult += number;
      });

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should iterate over an object', () => {
      var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
      var actualResult = 0;
      var expectedResult = 15;

      utils.forEach(obj, (key, index) => {
        actualResult += obj[key];
      });

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#getDefaultAttrs', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getDefaultAttrs, 'function', 'getDefaultAttrs should be a function');
    });

    it('should return default attributes for a link tag', () => {
      var actualResult = utils.getDefaultAttrs('link', 'foo.css');
      var expectedResult = {
        rel: 'stylesheet',
        type: 'text/css',
        href:  'foo.css',
        media: 'all'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should return default attributes for a script tag', () => {
      var actualResult = utils.getDefaultAttrs('script', 'bar.js');
      var expectedResult = {
        type: 'application/javascript',
        src:  'bar.js'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should return an empty object if the tag is not a script or link', () => {
      var actualResult = utils.getDefaultAttrs('div');
      var expectedResult = {};

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#getElement', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getElement, 'function', 'getElement should be a function');
    });
  });

  describe('#getElementNameAndType', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getElementNameAndType, 'function', 'getElementNameAndType should be a function');
    });
  });

  describe('#getElementType', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getElementType, 'function', 'getElementType should be a function');
    });
  });

  describe('#getProperty', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getProperty, 'function', 'getProperty should be a function');
    });
  });

  describe('#getRegex', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getRegex, 'function', 'getRegex should be a function');
    });
  });

  describe('#getRegexMatch', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getRegexMatch, 'function', 'getRegexMatch should be a function');
    });
  });

  describe('#isArray', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isArray, 'function', 'isArray should be a function');
    });
  });

  describe('#isDefined', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isDefined, 'function', 'isDefined should be a function');
    });
  });

  describe('#isDirective', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isDirective, 'function', 'isDirective should be a function');
    });
  });

  describe('#isFunction', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isFunction, 'function', 'isFunction should be a function');
    });
  });

  describe('#isIn', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isIn, 'function', 'isIn should be a function');
    });
  });

  describe('#isInitializedArray', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isInitializedArray, 'function', 'isInitializedArray should be a function');
    });
  });

  describe('#isObject', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isObject, 'function', 'isObject should be a function');
    });
  });

  describe('#isSelfClosingDirective', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isSelfClosingDirective, 'function', 'isSelfClosingDirective should be a function');
    });
  });

  describe('#isSpecialTag', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isSpecialTag, 'function', 'isSpecialTag should be a function');
    });
  });

  describe('#isString', () => {
    it('should be a function', () => {
      assert.typeOf(utils.isString, 'function', 'isString should be a function');
    });

    it('should validate if a string value is a String', () => {
      var value = 'Foo';

      assert.isTrue(utils.isString(value), 'Foo should be String');
    });

    it('should validate if a number value is not a String', () => {
      var value = 9999;

      assert.isFalse(utils.isString(value), 'Number 9999 should not be String');
    });

    it('should validate if an array is not a String', () => {
      var value = ['Foo'];

      assert.isFalse(utils.isString(value), 'Array should not be String');
    });

    it('should validate if an object is not a String', () => {
      var value = {
        foo: 'bar'
      };

      assert.isFalse(utils.isString(value), 'Object should not be String');
    });

    it('should validate if a function is not a String', () => {
      var value = () => {
        return 'Foo';
      };

      assert.isFalse(utils.isString(value), 'Function should not be String');
    });
  });

  describe('#log', () => {
    it('should be a function', () => {
      assert.typeOf(utils.log, 'function', 'log should be a function');
    });

    it('should log a message when is called', () => {
      var logSpy = sinon.spy(console, 'log');

      utils.log('Testing log');

      assert.isTrue(logSpy.called, 'message should be logged');
      logSpy.restore();
    });
  });

  describe('#merge', () => {
    it('should be a function', () => {
      assert.typeOf(utils.merge, 'function', 'merge should be a function');
    });

    it('should merge two objects', () => {
      var obj1 = {
        a: 'foo'
      };

      var obj2 = {
        b: 'bar'
      };

      var expectedObj = {
        a: 'foo',
        b: 'bar'
      };

      var mergedObj = utils.merge(obj1, obj2);

      assert.deepEqual(mergedObj, expectedObj, 'mergedObj should match expectedObj');
    });
  });

  describe('#newElement', () => {
    it('should be a function', () => {
      assert.typeOf(utils.newElement, 'function', 'newElement should be a function');
    });
  });
});
