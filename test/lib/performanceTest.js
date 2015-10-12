'use strict';

var performance = require('../../src/lib/performance');

describe('Performance', () => {
  describe('#getPerformance', () => {
    it('should be a function', () => {
      assert.typeOf(performance.getPerformance, 'function', 'getPerformance should be a function');
    });
  });

  describe('#startPerformance', () => {
    it('should be a function', () => {
      assert.typeOf(performance.startPerformance, 'function', 'startPerformance should be a function');
    });
  });
});
