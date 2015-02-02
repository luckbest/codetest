'use strict';

describe('Service: loanFactory', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var loanFactory;
  beforeEach(inject(function (_loanFactory_) {
    loanFactory = _loanFactory_;
  }));

  it('should do something', function () {
    expect(!!loanFactory).toBe(true);
  });

});
