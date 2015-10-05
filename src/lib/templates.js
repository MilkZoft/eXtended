'use strict';

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
  function getCompiledHTML(html, directiveProps) {
    var variablesMatch = utils.getRegexMatch(html, utils.getRegex('curlyBrackets'));
    var variableName;
    var propsStr;
    var newVariable;

    utils.forEach(variablesMatch, variable => {
      variableName = variable.replace('{{', '').replace('}}', '').trim();
      propsStr = variableName.substring(0, 11);

      if (variableName === 'this.props.attributes') {
        html = html.replace(variable, directiveProps.props.rawAttributes);
      } else if (propsStr === 'this.props.') {
        newVariable = variableName.substring(11);

        if (utils.isDefined(directiveProps.props[newVariable])) {
          html = html.replace(variable, directiveProps.props[newVariable]);
        }
      }
    });

    return html;
  }
}

// Exporting object
module.exports = new Templates();
