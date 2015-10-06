'use strict';

var elements = require('./elements');
var directives = require('./directives');

function Extended() {
  // Methods from elements
  this.create = elements.create;
  this.element = elements.element;
  this.render = elements.render;

  // Methods from directives
  this.createDirective = directives.createDirective;

  return this;
}

// Exporting object
module.exports = new Extended();
