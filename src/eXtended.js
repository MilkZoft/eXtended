'use strict';

// Creating instance
var eX = new Extended();

function Extended() {
    // Setting scope to eX object
    let eX = this;

    // Constants
    const SPECIAL_TAGS = ['link', 'script'];

    /**
     * Logs a message.
     *
     * @param {string} message
     * @internal
     */
    let _log = (message) => {
        console.log('eXtended:', message);
    };

    /**
     * Easy way to iterate over arrays and objects.
     *
     * @param {array || object} items
     * @param {function} callback
     * @protected
     */
    let _forEach = (items, callback) => {
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
     * @param {array/object} obj
     * @return {boolean} true if the item exists, false if not.
     * @protected
     */
    let _isIn = (item, obj) => {
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
    let _getProperty = (property) => {
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
     * @param {boolean} returnType = false
     * @return {object} element object depends on type
     * @protected
     */
    let _getElement = (elementName, returnType = false) => {
        let type = elementName[0];

        if (type === '#') {
            return !returnType ? document.getElementById(elementName.substring(1)) : 'id';
        } else if (type === '.') {
            return !returnType ? document.getElementsByClassName(elementName.substring(1)) : 'class';
        } else {
            return !returnType ? document.getElementsByTagName(elementName)[0] : 'tag';
        }
    };

    /**
     * Return the type of the element (id, class or tag)
     *
     * @param {string} elementName
     * @return {string} type of the element (id, class or tag)
     * @protected
     */
    let _getElementType = (elementName) => {
        return _getElement(elementName, true);
    };

    /**
     * Return the type and name of the element (id, class or tag).
     *
     * @param {string} tag
     * @return {object} element with properties.
     * @protected
     */
    let _getElementNameAndType = (tag) => {
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
    let _newElement = (element) => {
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
    let _getDefaultAttrs = (element, url) => {
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
    let _isSpecialTag = (tag, props) => {
        if (_isIn(tag, SPECIAL_TAGS) && props) {
             props = _getDefaultAttrs(tag, props);
        }

        return props;
    };

    // Exporting methods
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
    function create(tag, props = false, content) {
        let element = _getElementNameAndType(tag);
        let el = _newElement(element.name);
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

            props = _isSpecialTag(tag, props);

            return props;
        };

        // Builds the object
        let buildElement = () => {
            props = getProps(element, props);

            if (content) {
                el.innerHTML = content;
            }

            if (props instanceof Object) {
                _forEach(props, key => {
                    value = props[key] || '';
                    property = _getProperty(key);

                    el[property] = value;
                });
            } else if (props) {
                type = _getElementType(props, true);
                value = type !== 'tag' ? props.substring(1) : props;
                property = _getProperty(type);

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
        return _getElement(elementName);
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
            _log('You must specify a target and element to render');
            return;
        }

        let el = eX.element(target);

        _forEach(elements, element => {
            el.appendChild(element);
        });
    }
}
