/*eslint no-console: 0*/
'use strict';

function Performance() {
  var times = 1;

  // Methods
  this.getPerformance = getPerformance;
  this.startPerformance = startPerformance;

  return this;

  /**
   * Get the timeEnd of the performance
   *
   * @returns {console} timeEnd
   * @public
   */
  function getPerformance() {
    console.timeEnd('Benchmark ' + times);
    times++;
  }

  /**
   * Set the time of the performance.
   *
   * @returns {console} time
   * @public
   */
  function startPerformance() {
    console.time('Benchmark ' + times);
  }
}

// Exporting object
module.exports = new Performance();
