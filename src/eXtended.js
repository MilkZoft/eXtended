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
    };

    let _getProperty = (property) => {
        let properties = {
            className: 'className',
            content: 'innerHTML'
        };

        return properties[property] || '';
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
