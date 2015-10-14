'use strict';

var shared = require('./shared');
var utils = require('./utils');

function Dom() {
  // Methods
  this.attachEvents = attachEvents;
  this.getChildren = getChildren;
  this.getElement = getElement;
  this.getElementNameAndType = getElementNameAndType;
  this.getElementType = getElementType;
  this.hasExEvent = hasExEvent;
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
  function attachEvents(html, directiveClass, methods) {
    var analyzedAttributes = [];
    var children = [];
    var event;
    var fn;
    var hasEvent;
    var methodName;
    var methodObj;
    var tempMethods = methods.slice(0);
    var loop = function(element) {
      do {
        if (element.nodeType === 1) {
          // Returns an array or false (0 = attribute & 1 = event)
          hasEvent = hasExEvent(element);

          if (hasEvent) {
            if (!utils.exists(hasEvent[0], analyzedAttributes)) {
              analyzedAttributes.push(hasEvent[0]);

              event = hasEvent[1];
              methodName = shared.getMethodName(hasEvent[0]);
              methodObj = tempMethods.shift();

              if (utils.isDefined(directiveClass[methodName])) {
                // This IIFE is to send the values over the closoure
                (function (methodName, methodObj) {
                  fn = function(e) {
                    directiveClass[methodName].apply(undefined, methodObj[methodName]);
                  };

                  if (element.addEventListener) {
                    element.addEventListener(event, fn, false);
                  } else {
                    element.attachEvent(event, fn);
                  }
                })(methodName, methodObj);
              }
            }
          }

          children.push(element);
        }

        if (element.hasChildNodes()) {
          loop(element.firstChild);
        }
      } while (element = element.nextSibling);
    };

    // Analyzing all the children elements
    utils.forEach(getChildren(html), function(child) {
      loop(child);
    }, true);

    return children;
  }

  /**
   * Get the element target
   *
   * @param {string} html
   * @returns {object} HTML Collection
   * @protected
   */
  function getChildren(html) {
    var wrapper = newElement('div');
    wrapper.innerHTML = html;
    return wrapper.children;
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

    return !utils.isDefined(getType) ? query : utils.exists(type, types) ? types[type] : 'tag';
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
      var el = element;

      if (hasId.length > 1 && hasClasses.length >= 1) {
        el = getElementObject(
          element,
          hasId[0],
          hasId[1].substring(0, hasId[1].indexOf('.')),
          hasClasses
        );
      } else if (hasId.length === 2 || hasClasses.length >= 1) {
        el = getElementObject(
          element,
          hasId.length === 2 ? hasId[0] : name,
          hasId.length === 2 ? hasId[1] : false,
          hasId.length === 2 ? false : hasClasses
        );
      }

      return el;
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

  /**
   * Return an array with the attribute and the current event
   *
   * @param {object} element
   * @returns {array} attribute and event
   * @protected
   */
  function hasExEvent(element) {
    var exEvents = [
      'ex-click',
      'ex-change',
      'ex-mouseover',
      'ex-mouseout',
      'ex-keydown'
    ];
    var jsEvents = [
      'onclick',
      'change',
      'mouseover',
      'mouseout',
      'keydown'
    ];
    var event;
    var i;

    for (i = 0; i < exEvents.length; i++) {
      if (element.hasAttribute(exEvents[i])) {
        event = jsEvents[i];

        if (element.addEventListener && event === 'onclick') {
          event = 'click';
        }

        return [element.getAttribute(exEvents[i]), event];
      }
    }

    return false;
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
