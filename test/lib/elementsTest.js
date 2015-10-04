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

  describe('#render', () => {
    it('should be a function', () => {
      assert.typeOf(elements.render, 'function', 'render should be a function');
    });
  });
});
