'use strict';

var utils = require('./utils');
var directives = require('./directives');

function Elements() {
  // Methods
  this.create = create;
  this.element = element;
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
    var element = utils.getElementNameAndType(tag);
    var el = utils.newElement(element.name);
    var value;
    var property;
    var type;

    // Get properties for class or id and default attributes
    var getProps = (element, props) => {
      if (element.id || element.class) {
        props = !props ? {} : props;
      }

      if (element.id) {
        props.id = element.id;
      }

      if (element.class) {
        props.class = element.class;
      }

      props = utils.isSpecialTag(tag, props);

      return props;
    };

    // Builds the object
    var buildElement = () => {
      props = getProps(element, props);

      if (content) {
        el.innerHTML = content;
      }

      if (props instanceof Object) {
        utils.forEach(props, key => {
          value = props[key] || '';
          property = utils.getProperty(key);
          el[property] = value;
        });
      } else if (props) {
        type = utils.getElementType(props, true);
        value = type !== 'tag' ? props.substring(1) : props;
        property = utils.getProperty(type);
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
    return utils.getElement(elementName);
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

    var el = this.element(target);
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
      html = directives.getCompiledHTML(directiveClass.render(), directiveProps);
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
};

// Exporting object
module.exports = new Elements();
