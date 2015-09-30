'use strict';

// Dependencies
var utils = require('./lib/utils');

function Extended() {
  // Scoping
  let eX = this;

  // Methods
  eX.create = create;
  eX.element = element;
  eX.render = render;

  return eX;

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
    let element = utils.getElementNameAndType(tag);
    let el = utils.newElement(element.name);
    let value;
    let property;
    let type;

    // Get properties for class or id and default attributes
    let getProps = (element, props) => {
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
    let buildElement = () => {
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

    let el = eX.element(target);

    utils.forEach(elements, element => {
      el.appendChild(element);
    });
  }
}

// Exporting object
module.exports = new Extended();
