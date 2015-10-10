'use strict';

var elements = require('./elements');
var directives = require('./directives');
var shared = require('./shared');

function Extended() {
  // Methods from elements
  this.create = elements.create;
  this.element = elements.element;
  this.render = elements.render;

  // Methods from directives
  this.createDirective = directives.createDirective;

  // Methods from share
  this.getArguments = shared.getArguments;

  return this;
}

// Exporting object
module.exports = new Extended();
