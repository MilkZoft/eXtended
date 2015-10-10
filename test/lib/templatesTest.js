'use strict';

var templates = require('../../src/lib/templates');

describe('Templates', () => {
  describe('#getCompiledHTML', () => {
    it('should be a function', () => {
      assert.typeOf(templates.getCompiledHTML, 'function', 'getCompiledHTML should be a function');
    });

    it('should return compiled HTML', () => {
      var directiveProps = {
        props: {
          $url: 'http://www.testurl.com',
          $content: 'Foo'
        }
      };
      var html = templates.getNewElementFromTemplate('<a href="{{ this.props.$url }}">{{ this.props.$content }}</a>');
      var expectedResult = '<a href="http://www.testurl.com">Foo</a>';
      var actualResult = templates.getCompiledHTML(html, directiveProps).outerHTML;

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#getNewElementFromTemplate', () => {
    it('should be a function', () => {
      assert.typeOf(templates.getNewElementFromTemplate, 'function', 'getNewElementFromTemplate should be a function');
    });
  });
});
