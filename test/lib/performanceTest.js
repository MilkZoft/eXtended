'use strict';

var performance = require('../../src/lib/performance');

describe('Performance', () => {
  describe('#getPerformance', () => {
    it('should be a function', () => {
      assert.typeOf(performance.getPerformance, 'function', 'getPerformance should be a function');
    });

    it('should call console.timeEnd', () => {
      var timeEndSpy = sinon.spy(console, 'timeEnd');

      performance.getPerformance();

      assert.isTrue(timeEndSpy.called, 'console.timeEnd should be executed');
      timeEndSpy.restore();
    });
  });

  describe('#startPerformance', () => {
    it('should be a function', () => {
      assert.typeOf(performance.startPerformance, 'function', 'startPerformance should be a function');
    });

    it('should call console.time', () => {
      var timeSpy = sinon.spy(console, 'time');

      performance.startPerformance();

      assert.isTrue(timeSpy.called, 'console.time should be executed');
      timeSpy.restore();
    });
  });
});
