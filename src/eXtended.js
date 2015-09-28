'use strict';

var eX = new eXtended();

function eXtended() {
    let eX = this;

    /**
     * Private methods
     */
    let _log = (message) => {
        console.log('eXtended:', message);
    };

    let _forEach = (items, callback) => {
        if (items instanceof Array) {
            for (let i = 0; i < items.length; i++) {
                callback(items[i]);
            }
        } else {
            Object.keys(items).forEach(callback);
        }
    };

    let _isIn = (item, obj) => {
        if (obj instanceof Array) {
            return obj.indexOf(item) >= 0;
        } else {
            return typeof obj[item] !== 'undefined';
        }
    };

    let _getProperty = (property) => {
        let properties = {
            'class': 'className',
            'tag': 'className',
            'text': 'innerHTML',
            'content': 'innerHTML'
        };

        return properties[property] || property;
    };

    let _getElementType = (elementName) => {
        return _getElement(elementName, true);
    };

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

    let _getElementNameAndType = (tag) => {
        let hasId = tag.split('#');
        let hasClasses = tag.split('.');
        let name = hasClasses.shift();
        let element = {
            name: tag
        };

        if (hasId.length > 1 && hasClasses.length >= 1) {
            element.name = hasId[0];
            element.id = hasId[1].substring(0, hasId[1].indexOf('.'));
            element.class = hasClasses.length > 1 ? hasClasses.join(' ') : hasClasses[0];
        } else if (hasId.length === 2) {
            element.name = hasId[0];
            element.id = hasId[1];
            element.class = false;
        } else if(hasClasses.length >= 1) {
            element.name = name;
            element.id = false;
            element.class = hasClasses.length > 1 ? hasClasses.join(' ') : hasClasses[0];
        }

        return element;
    };

    let _newElement = (element) => {
        return document.createElement(element);
    };

    /**
     * Exported methods
     */
    eX.create = create;
    eX.element = element;
    eX.getDefaultAttrs = getDefaultAttrs;
    eX.render = render;

    return eX;

    /**
     * Public methods
     */
    function create(element, props = {}) {
        let el = _newElement(element);
        let value;
        let property;

        _forEach(props, key => {
            value = props[key] || '';
            property = _getProperty(key);

            el[property] = value;
        });

        return el;
    }

    function element(elementName = false) {
        let type = elementName[0];
        let element;

        elementName = elementName.substring(1);

        if (type === '#') {
            element = document.getElementById(elementName);
        } else if (type === '.') {
            element = document.getElementsByClassName(elementName);
        } else {
            element = document.getElementsByTagName(elementName);
        }

        return element;
    }

    function render(element, target = false) {
        if (!target) {
            _logger('You must specify a target to render an element');

            return;
        }

        let el = eX.element(target);

        el.appendChild(element);
    }
};
