'use strict';

var utils = require('./utils');

function Directives() {
  // Properties
  var directives = {};

  // Methods
  this.createDirective = createDirective;
  this.getAllDirectives = getAllDirectives;
  this.getDirective = getDirective;
  this.getDirectiveProps = getDirectiveProps;
  this.removeDirective = removeDirective;
  this.setDirective = setDirective;

  return this;

  /**
   * Creates a new directive object
   *
   * @param {string} directive
   * @param {object} obj
   * @returns {obj} directive object
   * @public
   */
  function createDirective(directive, obj) {
    setDirective(directive, obj);

    return obj;
  }

  /**
   * Get all existing directives
   *
   * @returns {obj} directives object
   * @public
   */
  function getAllDirectives() {
    return directives;
  }

  /**
   * Get a existing directive
   *
   * @param {string} directive
   * @returns {obj} directive object
   * @public
   */
  function getDirective(directive) {
    return utils.isDefined(directives[directive]) ? directives[directive] : false;
  }

  /**
   * Returns the props of a given directive
   *
   * @param {string} element
   * @returns {object} props
   * @protected
   */
  function getDirectiveProps(element) {
    var attributes = {};
    var attributesSplit;
    var directiveMatch;
    var selfClosingDirective = utils.isSelfClosingDirective(element);
    var values;

    directiveMatch = !selfClosingDirective ? utils.getRegexMatch(element, utils.getRegex('directive')) : [];

    attributes.$directiveName = directiveMatch[2] || selfClosingDirective;

    if (utils.isDefined(directiveMatch[4])) {
      attributes.$content = directiveMatch[4];
    }

    if (utils.isDefined(directiveMatch[3])) {
      attributes.$allAttributes = directiveMatch[3];
      attributesSplit = directiveMatch[3].replace(utils.getRegex('removeQuotes'), '').split(' ');

      utils.forEach(attributesSplit, attribute => {
        values = attribute.split('=');

        attributes[values[0]] = values[1];
      });
    }

    return {
      props: attributes
    };
  }

  /**
   * Get all existing directives
   *
   * @returns {obj} directives object
   * @public
   */
  function removeDirective(directive) {
    if (utils.isDefined(directives[directive])) {
      delete directives[directive];
    }
  }

  /**
   * Save a new directive
   *
   * @param {string} directive
   * @param {object} obj
   * @returns {obj} directive object
   * @public
   */
  function setDirective(directive, obj) {
    if (!utils.isDefined(directives[directive])) {
      directives[directive] = obj;
    }
  }
}

// Exporting object
module.exports = new Directives();
