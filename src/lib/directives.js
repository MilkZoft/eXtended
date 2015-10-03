'use strict';

let utils = require('./utils');

function Directives() {
  // Properties
  let directives = {};

  // Methods
  this.createDirective = createDirective;
  this.getAllDirectives = getAllDirectives;
  this.getCompiledHTML = getCompiledHTML;
  this.getDirective = getDirective;
  this.getDirectiveProps = getDirectiveProps;
  this.removeDirective = removeDirective;

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

  /**
   * Get a existing directive
   *
   * @param {string} directive
   * @returns {obj} directive object
   * @public
   */
  function getDirective(directive) {
    return utils.isDefined(directives[directive]) ? directives[directive] : {};
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
   * Returns the props of a given directive
   *
   * @param {string} element
   * @returns {object} props
   * @protected
   */
  function getDirectiveProps(element) {
    let attributes = {};
    let attributesSplit;
    let directiveMatch;
    let selfClosingDirective = utils.isSelfClosingDirective(element);
    let values;

    directiveMatch = !selfClosingDirective ? utils.getRegexMatch(element, getRegex('directive')) : [];

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
   * Get compiled HTML (with variables values)
   *
   * @param {string} html
   * @param {object} directiveProps
   * @returns {string} compiled HTML
   * @protected
   */
  function getCompiledHTML(html, directiveProps) {
    let variablesMatch = utils.getRegexMatch(html, utils.getRegex('curlyBrackets'));
    let variableName;
    let propsStr;
    let newVariable;

    utils.forEach(variablesMatch, variable => {
      variableName = variable.replace('{{', '').replace('}}', '').trim();
      propsStr = variableName.substring(0, 11);

      if (variableName === 'this.props.attributes') {
        html = html.replace(variable, directiveProps.props.rawAttributes);
      } else if (propsStr === 'this.props.') {
        newVariable = variableName.substring(11);

        if (utils.isDefined(directiveProps.props[newVariable])) {
          html = html.replace(variable, directiveProps.props[newVariable]);
        }
      }
    });

    return html;
  }
};

// Exporting object
module.exports = new Directives();
