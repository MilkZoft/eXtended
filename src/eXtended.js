'use strict';

var eX = new Extended();

function Extended() {
    let eX = this;

    /**
     * Logs a message
     *
     * message -> string
     */
    let _log = (message) => {
        console.log('eXtended:', message);
    };

    /**
     * Easy way to iterate over arrays and objects
     *
     * items    -> array/object
     * callback -> function
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
     * Validates if an item exists into an array or an object
     *
     * item -> string
     * obj  -> array/object
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
     * property -> string
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
     * elementName    -> string
     * returnType (*) -> boolean
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
     * elementName -> string
     */
    let _getElementType = (elementName) => {
        return _getElement(elementName, true);
    };

    /**
     * Return the type of the element (id, class or tag)
     *
     * elementName -> string
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
                element = __getElementObject(
                    element,
                    hasId[0],
                    hasId[1].substring(0, hasId[1].indexOf('.')),
                    hasClasses
                );
            } else if (hasId.length === 2 || hasClasses.length >= 1) {
                element = __getElementObject(
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
     * element -> string
     */
    let _newElement = (element) => {
        return document.createElement(element);
    };

    /**
     * Get default attributes for special tags (like link or script)
     *
     * element -> string
     * url (*) -> string
     */
    let _getDefaultAttrs = (element, url = false) => {
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

    // Exporting methods
    eX.create = create;
    eX.element = element;
    eX.render = render;

    return eX;

    /**
     * Creates a new element (id, class or tag)
     *
     * tag         -> string
     * props (*)   -> object/string
     * content (*) -> string
     */
    function create(tag, props = false, content = false) {
        let element = _getElementNameAndType(tag);
        let el = _newElement(element.name);
        let value;
        let property;
        let type;
        let specialTags = ['link', 'script'];

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

            if (_isIn(tag, specialTags) && props) {
                props = _getDefaultAttrs(tag, props);
            }

            return props;
        };

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
    }

    /**
     * Get an element object
     *
     * elementName -> string
     */
    function element(elementName) {
        return _getElement(elementName);
    }

    /**
     * Render elements
     *
     * target      -> string
     * ...elements -> array (spread operator)
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
