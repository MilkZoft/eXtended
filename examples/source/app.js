(function() {
  'use strict';

  var eX = require('./../../src/eXtended');

  var h1 = eX.create('h1#myId.myClass', {
    text: 'Hello World!'
  });

  var input = eX.create('input', {
    name: 'user',
    value: 'Username'
  });

  var span = eX.create('span', '.username', 'Write your username');
  var link = eX.create('link', 'public/css/mediaqueries/desktop.css');
  var script = eX.create('script', 'public/js/script.js');

  var p = eX.create('p#center.other.other2');

  eX.render('head', link, script);
  eX.render('body', h1, input, span, p);

  var linkTemplate = require('./templates/link.html');

  eX.createDirective('CheckLink', {
    render: function() {
      return linkTemplate;
    }
  });

  eX.render('#directive', '<CheckLink />', {
    $url: 'http://www.codejobs.biz',
    $content: 'Hello World'
  });
})();
