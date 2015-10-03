'use strict';

let utils = require('./utils');

function Directives() {
  let directives = {};

  // Methods
  this.createDirective = createDirective;

  return this;

  function createDirective(obj) {
    return obj;
  }
};

// Exporting object
module.exports = new Directives();
