'use strict';

function Utils() {
  // Constants
  const SPECIAL_TAGS = ['link', 'script'];
  const REGEX = {
    directive: /(<(.+)(?:\s([^>]+))*>)(.*)<\/\2>/,
    selfClosingDirective: /<[^>]+?\/[ ]*>/,
    removeQuotes: /["']/g,
    curlyBrackets: /\{\{(\s*?.*?)*?\}\}/g
  };

  // Methods
  this.forEach = forEach;
  this.getDefaultAttrs = getDefaultAttrs;
  this.getRegex = getRegex;
  this.getRegexMatch = getRegexMatch;
  this.inArray = inArray;
  this.inObject = inObject;
  this.isArray = isArray;
  this.isDefined = isDefined;
  this.isDirective = isDirective;
  this.isFunction = isFunction;
  this.isNull = isNull;
  this.isObject = isObject;
  this.isSelfClosingDirective = isSelfClosingDirective;
  this.isSpecialTag = isSpecialTag;
  this.isString = isString;
  this.log = log;
  this.merge = merge;

  return this;

  /**
   * Easy way to iterate over arrays and objects.
   *
   * @param {array || object} items
   * @param {function} callback
   * @protected
   */
  function forEach(items, callback) {
    if (isArray(items)) {
      for (var i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    } else {
      Object.keys(items).forEach(callback);
    }
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
   * Get a stored regular expression.
   *
   * @param {string} regex
   * @returns {regex} from REGEX constant
   * @protected
   */
  function getRegex(regex) {
    return REGEX[regex] || false;
  }

  /**
   * Get match from passed regular expression.
   *
   * @param {string} element
   * @param {regex} pattern
   * @returns {array} matches
   * @protected
   */
  function getRegexMatch(element, regex) {
    var match = element.match(new RegExp(regex));

    return !isNull(match) ? match : false;
  }

/**
   * Validates if an item exists into an array.
   *
   * @param {string} item
   * @param {array} obj
   * @returns {boolean} true if the item exists, false if not.
   * @protected
   */
  function inArray(item, array) {
    return array instanceof Array && array.indexOf(item) >= 0;
  }

  /**
   * Validates if an item exists into an object.
   *
   * @param {string} item
   * @param {object} obj
   * @returns {boolean} true if the item exists, false if not.
   * @protected
   */
  function inObject(item, obj) {
    return typeof obj[item] !== 'undefined';
  }

  /**
   * Validates if a passed variable is an array
   *
   * @param {array} array
   * @returns {boolean} true if is Array
   * @protected
   */
  function isArray(array) {
    return array instanceof Array;
  }

  /**
   * Validates if a passed value is defined
   *
   * @param {mixed} value
   * @param {boolean} isNot
   * @returns {boolean} true if is defined
   * @protected
   */
  function isDefined(value, isNot) {
    if (typeof isNot === 'undefined') {
      return typeof value !== 'undefined';
    } else {
      return typeof value !== 'undefined' && value !== isNot;
    }
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} element
   * @returns {boolean} true if is a directive
   * @protected
   */
  function isDirective(element) {
    if (isString(element) && getRegexMatch(element, getRegex('directive'))) {
      return true;
    } else if (isString(element)) {
      return !!getRegexMatch(element, getRegex('selfClosingDirective'));
    }

    return false;
  }

  /**
   * Validates if a passed variable is function
   *
   * @param {function} func
   * @returns {boolean} true if is function
   * @protected
   */
  function isFunction(func) {
    return typeof func === 'function';
  }

  /**
   * Validates if a passed value is null
   *
   * @param {mixed} value
   * @returns {boolean} true if is null
   * @protected
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Validates if a passed variable is an object
   *
   * @param {object} obj
   * @returns {boolean} true if is Object
   * @protected
   */
  function isObject(obj) {
    return obj instanceof Object && !isArray(obj) && typeof obj !== 'function';
  }

  /**
   * Returns true if an element is a self closing directive
   *
   * @param {string} element
   * @returns {boolean} true if is a self closing directive
   * @protected
   */
  function isSelfClosingDirective(element) {
    var match = getRegexMatch(element, getRegex('selfClosingDirective'));
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
    if (inArray(tag, SPECIAL_TAGS) && props) {
      return getDefaultAttrs(tag, props);
    }

    return false;
  }

  /**
   * Validates if a value is String
   *
   * @param {string} value
   * @returns {boolean} true if is String
   * @protected
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   * Logs a message.
   *
   * @param {string} message
   * @returns {void}
   * @internal
   */
  function log(message) {
    console.log('eXtended:', message);
  }

  /**
   * Easy way to merge two objects.
   *
   * @param {object} obj1
   * @param {object} obj2
   * @returns {object} merged obj1
   * @protected
   */
  function merge(obj1, obj2) {
    if (isFunction(Object.assign)) {
      return Object.assign(obj1, obj2);
    } else {
      for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
          obj1[key] = obj2[key];
        }
      }

      return obj1;
    }
  }
}

// Exporting object
module.exports = new Utils();
