'use strict';

var utils = require('./utils');

function Shared() {
  // Constants
  const SPECIAL_TAGS = ['link', 'script'];

  // Methods
  this.getArguments = getArguments;
  this.getDefaultAttrs = getDefaultAttrs;
  this.getProperty = getProperty;
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
    args = [].slice.call(args);

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
   * Validates if a given tag is a special tag.
   *
   * @param {string} tag
   * @param {object} props
   * @returns {object} props with default attributes.
   * @protected
   */
  function isSpecialTag(tag, props) {
    if (utils.inArray(tag, SPECIAL_TAGS) && props) {
      return getDefaultAttrs(tag, props);
    }

    return false;
  }
}

// Exporting object
module.exports = new Shared();
