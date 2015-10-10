'use strict';

var utils = require('./utils');

function Dom() {
  // Methods
  this.attachEvent = attachEvent;
  this.getElement = getElement;
  this.getElementNameAndType = getElementNameAndType;
  this.getElementType = getElementType
  this.live = live;
  this.newElement = newElement;

  return this;

  /**
   * Attach an event using live function
   *
   * @param {string} code
   * @param {string} directiveTarget
   * @param {object} directiveClass
   * @param {string} methodName
   * @param {array} params
   * @protected
   */
  function attachEvent(code, directiveTarget, directiveClass, methodName, params) {
    if (utils.search('ex-click', code)) {
      live('click', directiveTarget, function(event) {
        directiveClass[methodName].apply(undefined, params);
      });
    }
  }

  /**
   * Return an element object depends on type (id, class or tag)
   *
   * @param {string} elementName
   * @param {boolean} getType
   * @returns {object} element object depends on type
   * @protected
   */
  function getElement(elementName, getType) {
    var type = elementName[0];
    var query = type === '.' ? document.querySelectorAll(elementName) : document.querySelector(elementName);
    var types = {
      '.': 'class',
      '#': 'id'
    };

    return !utils.isDefined(getType) ? query : utils.inObject(type, types) ? types[type] : 'tag';
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
    var getElementObject = function(element, name, id, hasClass) {
      var className = hasClass.length > 1 ? hasClass.join(' ') : hasClass[0];

      if (utils.isDefined(name, false)) {
        element.name = name;
      }

      if (utils.isDefined(id, false)) {
        element.id = id;
      }

      if (utils.isDefined(className, false)) {
        element.class = className;
      }

      return element;
    };

    // Returns the id and class values for an element
    var getIdAndClassValues = function(hasId, hasClasses, element) {
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
    return getElement(elementName, true);
  }

  function live(eventType, elementQuerySelector, fn) {
    console.log(elementQuerySelector, fn);
    document.addEventListener(eventType, function(event) {
      var querySelector = getElement(elementQuerySelector);
      console.log(querySelector);
      if (querySelector) {
        var el = event.target;
        var index = -1;

        while (el && ((index = Array.prototype.indexOf.call(querySelector, el)) === -1)) {
          el = el.parentElement;
        }

        if (index > -1) {
          fn.call(el, event);
        }
      }
    });
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
module.exports = new Dom();
