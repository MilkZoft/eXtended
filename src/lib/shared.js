'use strict';

var utils = require('./utils');

function Shared() {
  // Constants
  const SPECIAL_TAGS = ['link', 'script'];

  // Methods
  this.getArguments = getArguments;
  this.getDefaultAttrs = getDefaultAttrs;
  this.getMethodName = getMethodName;
  this.getProperty = getProperty;
  this.isDirective = isDirective;
  this.isSelfClosingDirective = isSelfClosingDirective;
  this.isSpecialTag = isSpecialTag;

  return this;

  /**
   * Get arguments from arguments array
   *
   * @param {array} args
   * @returns {array} elements
   * @protected
   */
  function getArguments(args, comingFromCompiledHTML) {
    args = utils.getArray(args);

    if (args.length > 0 && !comingFromCompiledHTML) {
      args.shift();
    }

    return args;
  }

  /**
   * Get default attributes for special tags (like link or script).
   *
   * @param {string} element
   * @param {string} url
   * @returns {object} default properties
   * @protected
   */
  function getDefaultAttrs(element, url) {
    var properties = {
      link: {
        rel: 'stylesheet',
        type: 'text/css',
        href:  url || 'someStyle.css',
        media: 'all'
      },
      script: {
        type: 'application/javascript',
        src: url || 'someScript.js'
      }
    };

    return properties[element] || {};
  }

  /**
   * Return the name of a method from given attribute
   *
   * @param {string} elementName
   * @returns {string} type of the element (id, class or tag)
   * @protected
   */
  function getMethodName(attribute, vm) {
    var methodName = attribute.replace('{{', '').replace('}}', '').trim();
    var methodsStr = methodName.substring(0, vm.length + 1);
    var newMethod;

    if (methodsStr === vm + '.') {
      newMethod = methodName.substring(vm.length + 1).replace(', ', ',');
      methodName = newMethod.substring(0, newMethod.indexOf('('));

      return methodName;
    }

    return false;
  }

  /**
   * Short cuts for some properties
   *
   * @param {string} property
   * @returns {string} element property.
   * @protected
   */
  function getProperty(property) {
    var properties = {
      'class': 'className',
      'tag': 'className',
      'text': 'innerHTML',
      'content': 'innerHTML'
    };

    return properties[property] || property;
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} element
   * @returns {boolean} true if is a directive
   * @protected
   */
  function isDirective(element) {
    if (utils.isString(element) && utils.getRegexMatch(element, utils.getRegex('directive'))) {
      return utils.getRegexMatch(element, utils.getRegex('directive'));
    } else if (utils.isString(element)) {
      return isSelfClosingDirective(element);
    }

    return false;
  }

  /**
   * Returns true if an element is a self closing directive
   *
   * @param {string} element
   * @returns {boolean} true if is a self closing directive
   * @protected
   */
  function isSelfClosingDirective(element) {
    var match = utils.getRegexMatch(element, utils.getRegex('selfClosingDirective'));
    var directiveName;

    if (match) {
      directiveName = match[0].replace('<', '').replace('/', '').replace('>', '').trim();

      return directiveName;
    }

    return false;
  }

  /**
   * Validates if a given tag is a special tag.
   *
   * @param {string} tag
   * @param {object} props
   * @returns {object} props with default attributes.
   * @protected
   */
  function isSpecialTag(tag, props) {
    if (utils.exists(tag, SPECIAL_TAGS) && props) {
      return getDefaultAttrs(tag, props);
    }

    return false;
  }
}

// Exporting object
module.exports = new Shared();
