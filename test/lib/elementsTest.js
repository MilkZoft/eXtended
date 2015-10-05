'use strict';

var elements = require('../../src/lib/elements');

describe('Elements', () => {
  describe('#create', () => {
    it('should be a function', () => {
      assert.typeOf(elements.create, 'function', 'create should be a function');
    });
  });

  describe('#element', () => {
    it('should be a function', () => {
      assert.typeOf(elements.element, 'function', 'element should be a function');
    });
  });

  describe('#getElement', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElement, 'function', 'getElement should be a function');
    });
  });

  describe('#getElementNameAndType', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElementNameAndType, 'function', 'getElementNameAndType should be a function');
    });
  });

  describe('#getElementType', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElementType, 'function', 'getElementType should be a function');
    });
  });

  describe('#getProperty', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getProperty, 'function', 'getProperty should be a function');
    });
  });

  describe('#newElement', () => {
    it('should be a function', () => {
      assert.typeOf(elements.newElement, 'function', 'newElement should be a function');
    });
  });

  describe('#render', () => {
    it('should be a function', () => {
      assert.typeOf(elements.render, 'function', 'render should be a function');
    });
  });
});
