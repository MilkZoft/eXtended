'use strict';

var eX = require('./../../../../../../src/eXtended');

function CheckLinkCtrl() {
  // Methods
  this.run = run;

  return this;

  function run() {
    var linkTemplate = require('./checkLink.template.html');

    eX.createDirective('CheckLink', {
      showMessage: function() {
        var params = eX.getElements(arguments, true);

        console.log('Dentro de showMessage', params);
      },
      render: function() {
        return linkTemplate;
      }
    });

    eX.render('#directive', '<CheckLink />', {
      $url: {
        http: 'http://www.codejobs.biz'
      },
      $content: 'Hello World'
    });
  }
}

// Exporting object
module.exports = new CheckLinkCtrl();
