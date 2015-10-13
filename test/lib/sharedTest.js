'use strict';

var shared = require('../../src/lib/shared');

describe('Shared', () => {
  describe('#getArguments', () => {
    it('should be a function', () => {
      assert.typeOf(shared.getArguments, 'function', 'getArguments should be a function');
    });

    it('should return arguments without the first argument', () => {
      var args = [1, 2, 3];
      var expectedResult = [2, 3];
      var actualResult = shared.getArguments(args);

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should return all arguments from template (controller)', () => {
      var args = [1, 2, 3];
      var expectedResult = [1, 2, 3];
      var actualResult = shared.getArguments(args, true);

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#getDefaultAttrs', () => {
    it('should be a function', () => {
      assert.typeOf(shared.getDefaultAttrs, 'function', 'getDefaultAttrs should be a function');
    });

    it('should return default attributes for a link tag', () => {
      var actualResult = shared.getDefaultAttrs('link', 'foo.css');
      var expectedResult = {
        rel: 'stylesheet',
        type: 'text/css',
        href:  'foo.css',
        media: 'all'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should return default attributes for a script tag', () => {
      var actualResult = shared.getDefaultAttrs('script', 'bar.js');
      var expectedResult = {
        type: 'application/javascript',
        src:  'bar.js'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should return an empty object if the tag is not a script or link', () => {
      var actualResult = shared.getDefaultAttrs('div');
      var expectedResult = {};

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#getProperty', () => {
    it('should be a function', () => {
      assert.typeOf(shared.getProperty, 'function', 'getProperty should be a function');
    });

    it('should return the correct property given a short cut property', () => {
      var actualResult = shared.getProperty('class');
      var expectedResult = 'className';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should return the same property if does not exists in the properties object', () => {
      var actualResult = shared.getProperty('foo');
      var expectedResult = 'foo';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#isSpecialTag', () => {
    it('should be a function', () => {
      assert.typeOf(shared.isSpecialTag, 'function', 'isSpecialTag should be a function');
    });

    it('should validate if a link is a special tag', () => {
      var actualResult = !!shared.isSpecialTag('link', 'style.css');

      assert.isTrue(actualResult, 'actualResult should be true');
    });

    it('should validate if a script is a special tag', () => {
      var actualResult = !!shared.isSpecialTag('script', 'script.js');

      assert.isTrue(actualResult, 'actualResult should be true');
    });
  });
});
