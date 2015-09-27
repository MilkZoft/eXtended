(function() {
    'use strict';

    var h1 = eXtended.create('h1', {
        className: 'title',
        content: 'Hello World!'
    });

    console.log(h1);

    eXtended.render(h1, '#title');
})();
