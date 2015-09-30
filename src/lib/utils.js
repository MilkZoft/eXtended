'use strict';

function Utils() {
  // Scoping
  let utils = this;

  // Constants
  const SPECIAL_TAGS = ['link', 'script'];

  // Methods
  utils.log = log;
  utils.forEach = forEach;
  utils.isIn = isIn;
  utils.getProperty = getProperty;
  utils.getElement = getElement;
  utils.getElementType = getElementType;
  utils.getElementNameAndType = getElementNameAndType;
  utils.newElement = newElement;
  utils.getDefaultAttrs = getDefaultAttrs;
  utils.isSpecialTag = isSpecialTag;

  return utils;

  /**
   * Logs a message.
   *
   * @param {string} message
   * @internal
   */
  function log(message) {
    console.log('eXtended:', message);
  };

  /**
   * Easy way to iterate over arrays and objects.
   *
   * @param {array || object} items
   * @param {function} callback
   * @protected
   */
  function forEach(items, callback) {
    if (items instanceof Array) {
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
   * @return {boolean} true if the item exists, false if not.
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
   * @return {string} element property.
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
   * @return {object} element object depends on type
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

    return !getType ? query : utils.isIn(type, types) ? types[type] : 'tag';
  };

  /**
   * Return the type of the element (id, class or tag)
   *
   * @param {string} elementName
   * @return {string} type of the element (id, class or tag)
   * @protected
   */
  function getElementType(elementName) {
    return utils.getElement(elementName, true);
  };

  /**
   * Return the type and name of the element (id, class or tag).
   *
   * @param {string} tag
   * @return {object} element with properties.
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
   * @return {object} new element
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
   * @return {object} default properties
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
   * @return {object} props with default attributes.
   * @protected
   */
  function isSpecialTag(tag, props) {
    if (utils.isIn(tag, SPECIAL_TAGS) && props) {
      props = utils.getDefaultAttrs(tag, props);
    }

    return props;
  };
};

// Exporting object
module.exports = new Utils();
