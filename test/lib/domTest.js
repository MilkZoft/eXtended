'use strict';

var dom = require('../../src/lib/dom');

describe('Dom', () => {
  describe('#attachEvents', () => {
    it('should be a function', () => {
      assert.typeOf(dom.attachEvents, 'function', 'attachEvents should be a function');
    });
  });

  describe('#getElement', () => {
    it('should be a function', () => {
      assert.typeOf(dom.getElement, 'function', 'getElement should be a function');
    });

    it('should get an id element', () => {
      var querySelectorSpy = sinon.spy(document, 'querySelector');

      dom.getElement('#id');

      assert.isTrue(querySelectorSpy.called, 'document.querySelector was called');
    });

    it('should get a class element', () => {
      var querySelectorAllSpy = sinon.spy(document, 'querySelectorAll');

      dom.getElement('.class');

      assert.isTrue(querySelectorAllSpy.called, 'document.querySelectorAll was called');
    });
  });

  describe('#getElementNameAndType', () => {
    it('should be a function', () => {
      assert.typeOf(dom.getElementNameAndType, 'function', 'getElementNameAndType should be a function');
    });

    it('should get the name of the element', () => {
      var actualResult = dom.getElementNameAndType('h1');
      var expectedResult = {
        name: 'h1'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name and id of the element', () => {
      var actualResult = dom.getElementNameAndType('h1#foo');
      var expectedResult = {
        name: 'h1',
        id: 'foo'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name and class of the element', () => {
      var actualResult = dom.getElementNameAndType('h1.foo');
      var expectedResult = {
        name: 'h1',
        class: 'foo'
      };

      assert.deepEqual(actualResult, expectedResult, 'actualResult should match expectedResult');
    });

    it('should get the name, id and class of the element', () => {
      var actualResult = dom.getElementNameAndType('h1#foo.bar');
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
      assert.typeOf(dom.getElementType, 'function', 'getElementType should be a function');
    });

    it('should get the type of a given element (id)', () => {
      var actualResult = dom.getElementType('#foo');
      var expectedResult = 'id';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should get the type of a given element (class)', () => {
      var actualResult = dom.getElementType('.foo');
      var expectedResult = 'class';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });

    it('should get the type of a given element (tag)', () => {
      var actualResult = dom.getElementType('foo');
      var expectedResult = 'tag';

      assert.strictEqual(actualResult, expectedResult, 'actualResult should be equal to expectedResult');
    });
  });

  describe('#hasExEvent', () => {
    it('should be a function', () => {
      assert.typeOf(dom.hasExEvent, 'function', 'hasExEvent should be a function');
    });
  });

  describe('#newElement', () => {
    it('should be a function', () => {
      assert.typeOf(dom.newElement, 'function', 'newElement should be a function');
    });

    it('should create a new element', () => {
      var createElementSpy = sinon.spy(document, 'createElement');
      var h1 = dom.newElement('h1');

      assert.isTrue(createElementSpy.called, 'document.createElementSpy was called');
    });
  });
});
