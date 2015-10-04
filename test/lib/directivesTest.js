'use strict';

var directives = require('../../src/lib/directives');

describe('Directives', () => {
  describe('#createDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.createDirective, 'function', 'createDirective should be a function');
    });
  });

  describe('#getAllDirectives', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getAllDirectives, 'function', 'getAllDirectives should be a function');
    });
  });

  describe('#getCompiledHTML', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getCompiledHTML, 'function', 'getCompiledHTML should be a function');
    });
  });

  describe('#getDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getDirective, 'function', 'getDirective should be a function');
    });
  });

  describe('#getDirectiveProps', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getDirectiveProps, 'function', 'getDirectiveProps should be a function');
    });
  });

  describe('#removeDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.removeDirective, 'function', 'removeDirective should be a function');
    });
  });
});
