'use strict';

var eXtended = require('../src/eXtended');

describe('eXtended Library', () => {
  describe('#create', () => {
    it('should be a function', () => {
      assert.typeOf(eXtended.create, 'function', 'create should be a function');
    });
  });

  describe('#element', () => {
    it('should be a function', () => {
      assert.typeOf(eXtended.element, 'function', 'element should be a function');
    });
  });

  describe('#render', () => {
    it('should be a function', () => {
      assert.typeOf(eXtended.render, 'function', 'render should be a function');
    });
  });
});
