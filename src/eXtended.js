'use strict';

var eXtended = new eXtended();

function eXtended() {
    let eXtended = this;

    /**
     * Privage methods
     */
    let _logger = function(message) {
        console.log(message);
    };

    let _forEach = function(obj, callback) {
        Object.keys(obj).forEach(callback);
    };

    let _getProperty = function(property) {
        let properties = {
            className: 'className',
            content: 'innerHTML'
        };

        return properties[property] || '';
    };

    let _newElement = function(element) {
        return document.createElement(element);
    };

    /**
     * Exported methods
     */
    eXtended.create = create;
    eXtended.element = element;
    eXtended.render = render;

    return eXtended;

    /**
     * Methods
     */
    function create(element, props = {}) {
        let el = _newElement(element);
        let value;
        let property;

        _forEach(props, function(key) {
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

        let el = eXtended.element(target);

        el.appendChild(element);
    }
};
