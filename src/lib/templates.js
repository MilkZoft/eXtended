'use strict';

var dom = require('./dom');
var utils = require('./utils');

function Templates() {
  // Methods
  this.getCompiledHTML = getCompiledHTML;

  return this;

  /**
   * Get compiled HTML (with variables values)
   *
   * @param {string} html
   * @param {object} directiveProps
   * @returns {string} compiled HTML
   * @protected
   */
  function getCompiledHTML(html, directiveProps, directiveClass, vm) {
    var methodName;
    var methodsStr;
    var newMethod;
    var newVariable;
    var params;
    var parsedParams;
    var propsStr;
    var result = {};
    var paramsArray = [];
    var variableName;
    var variablesMatch = utils.getRegexMatch(html, utils.getRegex('curlyBrackets'));
    var methods = [];
    var vmLength = vm.length;

    // If found at least 1 variable inside {{ ... }}
    utils.forEach(variablesMatch, function(variable) {
      // Getting the name of the variable
      variableName = variable.replace('{{', '').replace('}}', '').trim();
      propsStr = variableName.substring(0, vmLength + 7);
      methodsStr = variableName.substring(0, vmLength + 1);

      // If there are props
      if (propsStr === vm + '.props.') {
        newVariable = variableName.substring(vmLength + 7);

        // If the newVariable exists in the directiveProps then replace it for the value
        if (utils.isDefined(directiveProps.props[newVariable])) {
          html = html.replace(variable, directiveProps.props[newVariable]);
        }
      } else if (methodsStr === vm + '.') {
        // If found a method...
        newMethod = variableName.substring(vmLength + 1).replace(', ', ',');
        methodName = newMethod.substring(0, newMethod.indexOf('('));
        params = utils.getRegexMatch(newMethod, utils.getRegex('params'));

        result[methodName] = [];

        // If has at least 1 parameter
        if (params.length > 0) {
          // Removing parenthesis (param1, param2, param3...)
          parsedParams = params[0].replace('(', '').replace(')', '');

          // Iterating on each param
          utils.forEach(parsedParams.split(','), function(param) {
            param = param.trim();

            if (utils.isString(param) && param[0] === "'" && param[param.length - 1] === "'") {
              param = param.substring(1, param.length - 1);
            } else if (!isNaN(parseInt(param))) {
              param = parseInt(param);
            } else {
              propsStr = param.substring(0, vmLength + 7);

              if (propsStr === vm + '.props.') {
                newVariable = param.substring(vmLength + 7);

                if (utils.isDefined(directiveProps.props[newVariable])) {
                  if (utils.isObject(directiveProps.props[newVariable])) {
                    param = param.replace(param, utils.getStringFromJson(directiveProps.props[newVariable]));
                  } else {
                    param = param.replace(param, directiveProps.props[newVariable]);
                  }
                }
              }
            }

            // Adding param to result array
            paramsArray.push(param);
          });

          // Saving params
          result[methodName] = paramsArray;
          methods.push(result);
          result = {};
          paramsArray = [];
        }
      }
    });

    // Attaching events
    return dom.attachEvents(html, directiveClass, methods, vm);
  }
}

// Exporting object
module.exports = new Templates();
