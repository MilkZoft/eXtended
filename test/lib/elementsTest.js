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
      var expectedResult = '<h1 class="title" id="title"></h1>';

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
      var expectedResult = '<link media="all" href="style.css" type="text/css" rel="stylesheet">';

      assert.strictEqual(link, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should create a script element with default attributes', () => {
      var link = elements.create('script', 'script.js').outerHTML;
      var expectedResult = '<script src="script.js" type="application/javascript"></script>';

      assert.strictEqual(link, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#element', () => {
    it('should be a function', () => {
      assert.typeOf(elements.element, 'function', 'element should be a function');
    });
  });

  describe('#getElement', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElement, 'function', 'getElement should be a function');
    });

    it('should get an id element', () => {
      var querySelectorSpy = sinon.spy(document, 'querySelector');

      elements.getElement('#id');

      assert.isTrue(querySelectorSpy.called, 'document.querySelector was called');
    });

    it('should get a class element', () => {
      var querySelectorAllSpy = sinon.spy(document, 'querySelectorAll');

      elements.getElement('.class');

      assert.isTrue(querySelectorAllSpy.called, 'document.querySelectorAll was called');
    });
  });

  describe('#getElementNameAndType', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElementNameAndType, 'function', 'getElementNameAndType should be a function');
    });

    it('should get the name of the element', () => {
      var actualResult = elements.getElementNameAndType('h1');
      var expectedResult = {
        name: 'h1'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name and id of the element', () => {
      var actualResult = elements.getElementNameAndType('h1#foo');
      var expectedResult = {
        name: 'h1',
        id: 'foo'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name and class of the element', () => {
      var actualResult = elements.getElementNameAndType('h1.foo');
      var expectedResult = {
        name: 'h1',
        class: 'foo'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name, id and class of the element', () => {
      var actualResult = elements.getElementNameAndType('h1#foo.bar');
      var expectedResult = {
        name: 'h1',
        id: 'foo',
        class: 'bar'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#getElementType', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getElementType, 'function', 'getElementType should be a function');
    });

    it('should get the type of a given element (id)', () => {
      var actualResult = elements.getElementType('#foo');
      var expectedResult = 'id';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should get the type of a given element (class)', () => {
      var actualResult = elements.getElementType('.foo');
      var expectedResult = 'class';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should get the type of a given element (tag)', () => {
      var actualResult = elements.getElementType('foo');
      var expectedResult = 'tag';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#getProperty', () => {
    it('should be a function', () => {
      assert.typeOf(elements.getProperty, 'function', 'getProperty should be a function');
    });

    it('should return the correct property given a short cut property', () => {
      var actualResult = elements.getProperty('class');
      var expectedResult = 'className';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should return the same property if does not exists in the properties object', () => {
      var actualResult = elements.getProperty('foo');
      var expectedResult = 'foo';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#newElement', () => {
    it('should be a function', () => {
      assert.typeOf(elements.newElement, 'function', 'newElement should be a function');
    });

    it('should create a new element', () => {
      var createElementSpy = sinon.spy(document, 'createElement');
      var h1 = elements.newElement('h1');

      assert.isTrue(createElementSpy.called, 'document.createElementSpy was called');
    });
  });

  describe('#render', () => {
    it('should be a function', () => {
      assert.typeOf(elements.render, 'function', 'render should be a function');
    });
  });
});
