'use strict';

var eXtended = require('../src/eXtended');

describe('eXtended Library', function() {
  describe('#create', function() {
    it('should be a function', function() {
      assert.typeOf(eXtended.create, 'function', 'create should be a function');
    });
  });

  describe('#element', function() {
    it('should be a function', function() {
      assert.typeOf(eXtended.element, 'function', 'element should be a function');
    });
  });

  describe('#render', function() {
    it('should be a function', function() {
      assert.typeOf(eXtended.render, 'function', 'render should be a function');
    });
  });
});
