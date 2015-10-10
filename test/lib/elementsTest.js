'use strict';

var elements = require('../../src/lib/elements');

describe('Elements', () => {
  describe('#create', () => {
    it('should be a function', () => {
      assert.typeOf(elements.create, 'function', 'create should be a function');
    });

    it('should create an empty h1 element', () => {
      var h1 = elements.create('h1').outerHTML;
      var expectedResult = '<h1></h1>';

      assert.strictEqual(h1, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create an h1 element with an id', () => {
      var h1 = elements.create('h1#title').outerHTML;
      var expectedResult = '<h1 id="title"></h1>';

      assert.strictEqual(h1, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create an h1 element with a class', () => {
      var h1 = elements.create('h1.title').outerHTML;
      var expectedResult = '<h1 class="title"></h1>';

      assert.strictEqual(h1, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create an h1 element with an id and a class', () => {
      var h1 = elements.create('h1#title.title').outerHTML;
      var expectedResult = '<h1 id="title" class="title"></h1>';

      assert.strictEqual(h1, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create an h1 element with content', () => {
      var h1 = elements.create('h1', {
        text: 'Foo'
      }).outerHTML;
      var expectedResult = '<h1>Foo</h1>';

      assert.strictEqual(h1, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create a span element with class and content using params instead of object', () => {
      var span = elements.create('span', '.test', 'Foo').outerHTML;
      var expectedResult = '<span class="test">Foo</span>';

      assert.strictEqual(span, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create a link element with default attributes', () => {
      var link = elements.create('link', 'style.css').outerHTML;
      var expectedResult = '<link rel="stylesheet" type="text/css" href="style.css" media="all">';

      assert.strictEqual(link, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create a script element with default attributes', () => {
      var link = elements.create('script', 'script.js').outerHTML;
      var expectedResult = '<script type="application/javascript" src="script.js"></script>';

      assert.strictEqual(link, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#element', () => {
    it('should be a function', () => {
      assert.typeOf(elements.element, 'function', 'element should be a function');
    });
  });

  describe('#render', () => {
    it('should be a function', () => {
      assert.typeOf(elements.render, 'function', 'render should be a function');
    });
  });
});
