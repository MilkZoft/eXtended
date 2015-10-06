'use strict';

var directives = require('../../src/lib/directives');

describe('Directives', () => {
  describe('#createDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.createDirective, 'function', 'createDirective should be a function');
    });

    it('should create a new directive', () => {
      var newDirective = directives.createDirective('FooDirective', {
        render: () => {
          return '<p>Foo</p>';
        }
      });

      assert.typeOf(newDirective, 'object', 'newDirective should be an object');
    });
  });

  describe('#getAllDirectives', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getAllDirectives, 'function', 'getAllDirectives should be a function');
    });

    it('should return all created directives', () => {
      var newDirective = directives.createDirective('FooDirective', {
        render: () => {
          return '<p>Foo</p>';
        }
      });

      var allDirectives = directives.getAllDirectives();

      assert.typeOf(allDirectives, 'object', 'allDirectives should be an object');
    });
  });

  describe('#getDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getDirective, 'function', 'getDirective should be a function');
    });

    it('should get an existing directive', () => {
      var newDirective = directives.createDirective('FooDirective', {
        render: () => {
          return '<p>Foo</p>';
        }
      });

      var FooDirective = directives.getDirective('FooDirective');

      assert.typeOf(FooDirective, 'object', 'allDirectives should be an object');
    });
  });

  describe('#getDirectiveProps', () => {
    it('should be a function', () => {
      assert.typeOf(directives.getDirectiveProps, 'function', 'getDirectiveProps should be a function');
    });

    it('should return the properties of given directive', () => {
      var directive = '<FooDirective $url="http://www.testurl.com" $content="Foo"></FooDirective>';
      var actualResult = directives.getDirectiveProps(directive);
      var expectedResult = {
        props: {
          $directiveName: 'FooDirective',
          $content: 'Foo',
          $allAttributes: '$url="http://www.testurl.com" $content="Foo"',
          $url: 'http://www.testurl.com'
        }
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#removeDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.removeDirective, 'function', 'removeDirective should be a function');
    });

    it('should remove a directive', () => {
      var newDirective = directives.createDirective('FooDirective', {
        render: () => {
          return '<p>Foo</p>';
        }
      });
      var FooDirective;

      directives.removeDirective('FooDirective');

      FooDirective = directives.getDirective('FooDirective');

      assert.isFalse(FooDirective, 'FooDirective should be false');
    });
  });

  describe('#setDirective', () => {
    it('should be a function', () => {
      assert.typeOf(directives.setDirective, 'function', 'setDirective should be a function');
    });
  });
});
