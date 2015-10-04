'use strict';

var eXtended = require('../src/eXtended');
console.log(eXtended);
describe('Give it some context', function() {
  describe('maybe a bit more context here', function() {
    it('should run here few assertions', function() {
      console.log('Testing fake assertions....');
    });
  });
});
