'use strict';

var utils = require('./utils');
var directives = require('./directives');
var templates = require('./templates');

function Elements() {
  // Methods
  this.create = create;
  this.element = element;
  this.getElement = getElement;
  this.getElementNameAndType = getElementNameAndType;
  this.getElementType = getElementType;
  this.getProperty = getProperty;
  this.newElement = newElement;
  this.render = render;

  return this;

  /**
   * Creates a new element (with or without id & class).
   *
   * @param {string} tag
   * @param {object || string || boolean} props = false
   * @param {string} content
   * @return {object} element with properties.
   * @public
   */
  function create(tag, props, content) {
    var element = getElementNameAndType(tag);
    var el = newElement(element.name);
    var value;
    var property;
    var type;

    // Get properties for class or id and default attributes
    var getProps = (element, props) => {
      var newProps = utils.isSpecialTag(tag, props);

      if (element.id || element.class) {
        props = !props ? {} : props;
      }

      if (element.id) {
        props.id = element.id;
      }

      if (element.class) {
        props.class = element.class;
      }

      return newProps ? utils.merge(props, newProps) : props;
    };

    // Builds the object
    var buildElement = () => {
      props = getProps(element, props);

      if (content) {
        el.innerHTML = content;
      }

      if (utils.isObject(props)) {
        utils.forEach(props, key => {
          value = props[key] || '';
          property = getProperty(key);
          el[property] = value;
        });
      } else if (props) {
        type = getElementType(props, true);
        value = type !== 'tag' ? props.substring(1) : props;
        property = getProperty(type);
        el[property] = value;
      }

      return el;
    };

    return buildElement();
  }

  /**
   * Get an element object.
   *
   * @param {string} elementName
   * @return {object} element
   * @public
   */
  function element(elementName) {
    return getElement(elementName);
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

    return !getType ? query : utils.inObject(type, types) ? types[type] : 'tag';
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
    return getElement(elementName, true);
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
   * Creates a new element
   *
   * @param {string} element
   * @returns {object} new element
   * @protected
   */
  function newElement(element) {
    return document.createElement(element);
  }

  /**
   * Render elements.
   *
   * @param {string} target
   * @param {array} elements
   * @public
   */
  function render(target, ...elements) {
    if (!target || elements.length === 0) {
      utils.log('You must specify a target and element to render');
      return;
    }

    var el = element(target);
    var directiveProps;
    var directiveClass;
    var html;
    var properties = {};

    if (utils.isDirective(elements[0])) {
      if (utils.isObject(elements[1])) {
        properties = elements[1];
      }

      directiveProps = directives.getDirectiveProps(elements[0]);
      directiveProps.props = utils.merge(directiveProps.props, properties);
      directiveClass = directives.getDirective(directiveProps.props.$directiveName);
      html = templates.getCompiledHTML(directiveClass.render(), directiveProps);
      directives.removeDirective(directiveProps.props.$directiveName);

      el.innerHTML = html;
    } else {
      utils.forEach(elements, element => {
        if (utils.isObject(element)) {
          el.appendChild(element);
        }
      });
    }
  }
}

// Exporting object
module.exports = new Elements();
