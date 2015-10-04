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
  this.convertCollectionToArray = convertCollectionToArray;
  this.forEach = forEach;
  this.getDefaultAttrs = getDefaultAttrs;
  this.getElement = getElement;
  this.getElementNameAndType = getElementNameAndType;
  this.getElementType = getElementType;
  this.getProperty = getProperty;
  this.getRegex = getRegex;
  this.getRegexMatch = getRegexMatch;
  this.isArray = isArray;
  this.isDefined = isDefined;
  this.isDirective = isDirective;
  this.isFunction = isFunction;
  this.isIn = isIn;
  this.isInitializedArray = isInitializedArray;
  this.isObject = isObject;
  this.isSelfClosingDirective = isSelfClosingDirective;
  this.isSpecialTag = isSpecialTag;
  this.isString = isString;
  this.log = log;
  this.merge = merge;
  this.newElement = newElement;

  return this;

  /**
   * Convert a Collection to an Array
   *
   * @param {collection} collection
   * @returns {array} new array or same array
   * @protected
   */
  function convertCollectionToArray(collection) {
    if (isInitializedArray(collection)) {
      return [].slice.call(collection);
    }

    return collection;
  }

  /**
   * Easy way to iterate over arrays and objects.
   *
   * @param {array || object} items
   * @param {function} callback
   * @protected
   */
  function forEach(items, callback) {
    items = convertCollectionToArray(items);

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

    return properties[element];
  }

  /**
   * Return an element object depends on type (id, class or tag)
   *
   * @param {string} elementName
   * @param {boolean} getType = false
   * @returns {object} element object depends on type
   * @protected
   */
  function getElement(elementName, getType = false) {
    var type = elementName[0];
    var query = type === '.' ? document.querySelectorAll(elementName) : document.querySelector(elementName);
    var types = {
      '.': 'class',
      '#': 'id'
    };

    return !getType ? query : isIn(type, types) ? types[type] : 'tag';
  }

  /**
   * Return the type and name of the element (id, class or tag).
   *
   * @param {string} tag
   * @returns {object} element with properties.
   * @protected
   */
  function getElementNameAndType(tag) {
    var hasId = tag.split('#');
    var hasClasses = tag.split('.');
    var name = hasClasses.shift();
    var element = {
      name: tag
    };

    // Returns the object element with the name, id and class
    var getElementObject = (element, name, id, hasClass) => {
      element.name = name;
      element.id = id;
      element.class = hasClass.length > 1 ? hasClass.join(' ') : hasClass[0];

      return element;
    };

    // Returns the id and class values for an element
    var getIdAndClassValues = (hasId, hasClasses, element) => {
      if (hasId.length > 1 && hasClasses.length >= 1) {
        element = getElementObject(
          element,
          hasId[0],
          hasId[1].substring(0, hasId[1].indexOf('.')),
          hasClasses
        );
      } else if (hasId.length === 2 || hasClasses.length >= 1) {
        element = getElementObject(
          element,
          hasId.length === 2 ? hasId[0] : name,
          hasId.length === 2 ? hasId[1] : false,
          hasId.length === 2 ? false : hasClasses
        );
      }

      return element;
    };

    return getIdAndClassValues(hasId, hasClasses, element);
  }

  /**
   * Return the type of the element (id, class or tag)
   *
   * @param {string} elementName
   * @returns {string} type of the element (id, class or tag)
   * @protected
   */
  function getElementType(elementName) {
    return this.getElement(elementName, true);
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
    return element.match(new RegExp(regex));
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
   * @returns {boolean} true if is defined
   * @protected
   */
  function isDefined(value) {
    return typeof value !== 'undefined';
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} element
   * @returns {boolean} true if is a directive
   * @protected
   */
  function isDirective(element) {
    var match;

    if (this.isString(element) && getRegexMatch(element, getRegex('directive'))) {
      return true;
    } else if (this.isString(element)) {
      match = getRegexMatch(element, getRegex('selfClosingDirective'));

      if (match) {
        return true;
      }
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
   * Validates if an item exists into an array or an object.
   *
   * @param {string} item
   * @param {array || object} obj
   * @returns {boolean} true if the item exists, false if not.
   * @protected
   */
  function isIn(item, obj) {
    if (obj instanceof Array) {
      return obj.indexOf(item) >= 0;
    } else {
      return typeof obj[item] !== 'undefined';
    }
  }

  /**
   * Validates if a passed array is initialized
   *
   * @param {array} items
   * @returns {boolean} true if the first position is defined
   * @protected
   */
  function isInitializedArray(items) {
    return isDefined(items[0]);
  }

  /**
   * Validates if a passed variable is an object
   *
   * @param {object} obj
   * @returns {boolean} true if is Object
   * @protected
   */
  function isObject(obj) {
    return obj instanceof Object && !isArray(obj);
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
    if (this.isIn(tag, SPECIAL_TAGS) && props) {
      props = this.getDefaultAttrs(tag, props);
    }

    return props;
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

  /**
   * Creates a new element
   *
   * @param {string} element
   * @returns {object} new element
   * @protected
   */
  function newElement(element) {
    return document.createElement(element);
  }
}

// Exporting object
module.exports = new Utils();
