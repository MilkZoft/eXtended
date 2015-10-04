'use strict';

var utils = require('../../src/lib/utils');

describe('Utils', () => {
  describe('#convertCollectionToArray', () => {
    it('should be a function', () => {
      assert.typeOf(utils.convertCollectionToArray, 'function', 'convertCollectionToArray should be a function');
    });
  });

  describe('#forEach', () => {
    it('should be a function', () => {
      assert.typeOf(utils.forEach, 'function', 'forEach should be a function');
    });
  });

  describe('#getDefaultAttrs', () => {
    it('should be a function', () => {
      assert.typeOf(utils.getDefaultAttrs, 'function', 'getDefaultAttrs should be a function');
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
  });

  describe('#log', () => {
    it('should be a function', () => {
      assert.typeOf(utils.log, 'function', 'log should be a function');
    });
  });

  describe('#merge', () => {
    it('should be a function', () => {
      assert.typeOf(utils.merge, 'function', 'merge should be a function');
    });
  });

  describe('#newElement', () => {
    it('should be a function', () => {
      assert.typeOf(utils.newElement, 'function', 'newElement should be a function');
    });
  });
});
