'use strict';

var elements = require('./elements');

function Extended() {
  // Methods from elements
  this.create = elements.create;
  this.element = elements.element;
  this.render = elements.render;

  return this;
};

// Exporting object
module.exports = new Extended();
