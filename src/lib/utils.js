'use strict';

function Utils() {
  // Methods
  this.forEach = forEach;
  this.getJson = getJson;
  this.getMethodName = getMethodName;
  this.getRegex = getRegex;
  this.getRegexMatch = getRegexMatch;
  this.getStringFromJson = getStringFromJson;
  this.inArray = inArray;
  this.inObject = inObject;
  this.isArray = isArray;
  this.isDefined = isDefined;
  this.isDirective = isDirective;
  this.isFunction = isFunction;
  this.isJson = isJson;
  this.isNull = isNull;
  this.isObject = isObject;
  this.isSelfClosingDirective = isSelfClosingDirective;
  this.isString = isString;
  this.merge = merge;
  this.search = search;

  return this;

  /**
   * Easy way to iterate over arrays and objects.
   *
   * @param {array || object} items
   * @param {function} callback
   * @protected
   */
  function forEach(items, callback, isHTMLCollection) {
    var i;

    if (isArray(items) || isHTMLCollection) {
      for (i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    } else {
      Object.keys(items).forEach(callback);
    }
  }

  /**
   * Get Json from string
   *
   * @param {string} str
   * @returns {object} json
   * @protected
   */
  function getJson(str) {
    if (isJson(str)) {
      return JSON.parse(str);
    }

    return str;
  }

  /**
   * Return the name of a method from given attribute
   *
   * @param {string} elementName
   * @returns {string} type of the element (id, class or tag)
   * @protected
   */
  function getMethodName(attribute) {
    var methodName = attribute.replace('{{', '').replace('}}', '').trim();
    var methodsStr = methodName.substring(0, 5);
    var newMethod;

    if (methodsStr === 'this.') {
      newMethod = methodName.substring(5).replace(', ', ',');
      methodName = newMethod.substring(0, newMethod.indexOf('('));

      return methodName;
    }

    return false;
  }

  /**
   * Get a stored regular expression.
   *
   * @param {string} regex
   * @returns {regex} from REGEX constant
   * @protected
   */
  function getRegex(regex) {
    // Constants
    const REGEX = {
      directive: /(<(.+)(?:\s([^>]+))*>)(.*)<\/\2>/,
      selfClosingDirective: /<[^>]+?\/[ ]*>/,
      removeQuotes: /["']/g,
      curlyBrackets: /\{\{(\s*?.*?)*?\}\}/g,
      tagName: /<(\w+)\s+\w+.*?>/
    };

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
   * Get a string from json object
   *
   * @param {object} obj
   * @returns {string} json
   * @protected
   */
  function getStringFromJson(obj) {
    return JSON.stringify(obj);
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
    }

    return typeof value !== 'undefined' && value !== isNot;
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} element
   * @returns {boolean} true if is a directive
   * @protected
   */
  function isDirective(element) {
    if (isString(element) && getRegexMatch(element, getRegex('directive'))) {
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
   * Validates if a passed string is a valid json
   *
   * @param {string} str
   * @returns {boolean} true if is Json
   * @protected
   */
  function isJson(str) {
    if (str === null) {
      return false;
    }

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
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
   * Easy way to merge two objects.
   *
   * @param {object} obj1
   * @param {object} obj2
   * @returns {object} merged obj1
   * @protected
   */
  function merge(obj1, obj2) {
    var key;

    if (isFunction(Object.assign)) {
      return Object.assign(obj1, obj2);
    }

    for (key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }

    return obj1;
  }

  /**
   * Search a string inside other string
   *
   * @param {string} word
   * @param {string} string
   * @returns {boolean} true if found the string
   * @protected
   */
  function search(word, string) {
    return isDefined(string) && string.search(word) !== -1;
  }
}

// Exporting object
module.exports = new Utils();
