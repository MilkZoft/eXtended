'use strict';

var templates = require('../../src/lib/templates');

describe('Templates', () => {
  describe('#getCompiledHTML', () => {
    it('should be a function', () => {
      assert.typeOf(templates.getCompiledHTML, 'function', 'getCompiledHTML should be a function');
    });
  });
});
