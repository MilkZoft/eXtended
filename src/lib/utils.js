'use strict';

function Utils() {
  // Constants
  const SPECIAL_TAGS = ['link', 'script'];
  const DIRECTIVE_REGEX = /(<(.+)(?:\s([^>]+))*>)(.*)<\/\2>/;
  const REMOVE_QUOTES_REGEX = /["']/g;
  const CURLY_BRACKETS_REGEX = /\{\{(\s*?.*?)*?\}\}/g;

  // Methods
  this.log = log;
  this.forEach = forEach;
  this.getProperty = getProperty;
  this.getElement = getElement;
  this.getElementType = getElementType;
  this.getElementNameAndType = getElementNameAndType;
  this.newElement = newElement;
  this.getDefaultAttrs = getDefaultAttrs;
  this.getDirective = getDirective;
  this.getCompiledHTML = getCompiledHTML;
  this.isIn = isIn;
  this.isSpecialTag = isSpecialTag;
  this.isInitializedArray = isInitializedArray;
  this.isString = isString;
  this.isArray = isArray;
  this.isObject = isObject;
  this.isDefined = isDefined;
  this.isDirective = isDirective;

  return this;

  /**
   * Logs a message.
   *
   * @param {string} message
   * @internal
   */
  function log(message) {
    console.log('eXtended:', message);
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} elements
   * @returns {boolean} true if is a directive
   * @protected
   */
  function isDirective(element) {
    return this.isString(element) && element.match(new RegExp(DIRECTIVE_REGEX));
  }

  /**
   * Returns true if an element is a directive
   *
   * @param {string} elements
   * @returns {boolean} true if is a directive
   * @protected
   */
  function getDirective(element) {
    let directiveMatch = getRegexMatch(element, DIRECTIVE_REGEX);
    let attributesSplit;
    let attributes = {
      $content: directiveMatch[4]
    };
    let values;

    if (isDefined(directiveMatch[3])) {
      attributes.rawAttributes = directiveMatch[3];
      attributesSplit = directiveMatch[3].replace(REMOVE_QUOTES_REGEX, '').split(' ');

      this.forEach(attributesSplit, attribute => {
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
    let variablesMatch = getRegexMatch(html, CURLY_BRACKETS_REGEX);
    let variableName;
    let propsStr;
    let newVariable;

    forEach(variablesMatch, variable => {
      variableName = variable.replace('{{', '').replace('}}', '').trim();
      propsStr = variableName.substring(0, 11);

      if (variableName === 'this.props.attributes') {
        html = html.replace(variable, directiveProps.props.rawAttributes);
      } else if (propsStr === 'this.props.') {
        newVariable = variableName.substring(11);

        if (isDefined(directiveProps.props[newVariable])) {
          html = html.replace(variable, directiveProps.props[newVariable]);
        }
      }
    });

    return html;
  }

  /**
   * Get match from passed regular expression.
   *
   * @param {string} element
   * @param {regex} pattern
   * @returns {array} matches
   * @protected
   */
  function getRegexMatch(element, pattern) {
    return element.match(new RegExp(pattern));
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
   * Easy way to iterate over arrays and objects.
   *
   * @param {array || object} items
   * @param {function} callback
   * @protected
   */
  function forEach(items, callback) {
    items = convertCollectionToArray(items);

    if (isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    } else {
      Object.keys(items).forEach(callback);
    }
  };

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
  };

  /**
   * Short cuts for some properties
   *
   * @param {string} property
   * @returns {string} element property.
   * @protected
   */
  function getProperty(property) {
    let properties = {
      'class': 'className',
      'tag': 'className',
      'text': 'innerHTML',
      'content': 'innerHTML'
    };

    return properties[property] || property;
  };

  /**
   * Return an element object depends on type (id, class or tag)
   *
   * @param {string} elementName
   * @param {boolean} getType = false
   * @returns {object} element object depends on type
   * @protected
   */
  function getElement(elementName, getType = false) {
    let type = elementName[0];
    let query = type === '.' ?
                  document.querySelectorAll(elementName) :
                  document.querySelector(elementName);
    let types = {
      '.': 'class',
      '#': 'id'
    };

    return !getType ? query : this.isIn(type, types) ? types[type] : 'tag';
  };

  /**
   * Return the type of the element (id, class or tag)
   *
   * @param {string} elementName
   * @returns {string} type of the element (id, class or tag)
   * @protected
   */
  function getElementType(elementName) {
    return this.getElement(elementName, true);
  };

  /**
   * Return the type and name of the element (id, class or tag).
   *
   * @param {string} tag
   * @returns {object} element with properties.
   * @protected
   */
  function getElementNameAndType(tag) {
    let hasId = tag.split('#');
    let hasClasses = tag.split('.');
    let name = hasClasses.shift();
    let element = {
      name: tag
    };

    // Returns the object element with the name, id and class
    let getElementObject = (element, name, id, hasClass) => {
      element.name = name;
      element.id = id;
      element.class = hasClass.length > 1 ? hasClass.join(' ') : hasClass[0];

      return element;
    };

    // Returns the id and class values for an element
    let getIdAndClassValues = (hasId, hasClasses, element) => {
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
          hasId.length === 2 ? false    : hasClasses
        );
      }

      return element;
    };

    return getIdAndClassValues(hasId, hasClasses, element);
  };

  /**
   * Creates a new element
   *
   * @param {string} element
   * @returns {object} new element
   * @protected
   */
  function newElement(element) {
      return document.createElement(element);
  };

  /**
   * Get default attributes for special tags (like link or script).
   *
   * @param {string} element
   * @param {string} url
   * @returns {object} default properties
   * @protected
   */
  function getDefaultAttrs(element, url) {
    let properties = {
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
  };

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
  };
};

// Exporting object
module.exports = new Utils();
