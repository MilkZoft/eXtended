/*eslint no-console: 0*/
'use strict';

function Performance() {
  var times = 1;

  // Methods
  this.getPerformance = getPerformance;
  this.startPerformance = startPerformance;

  return this;

  /**
   * Get arguments from arguments array
   *
   * @param {array} args
   * @returns {array} elements
   * @protected
   */
  function getPerformance() {
    console.timeEnd('Benchmark ' + times);
    times++;
  }

  /**
   * Get default attributes for special tags (like link or script).
   *
   * @param {string} element
   * @param {string} url
   * @returns {object} default properties
   * @protected
   */
  function startPerformance() {
    console.time('Benchmark ' + times);
  }
}

// Exporting object
module.exports = new Performance();
