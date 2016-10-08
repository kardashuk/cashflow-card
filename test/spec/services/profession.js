'use strict';

describe('Service: profession', function () {

  // load the service's module
  beforeEach(module('cashflowCardApp'));

  // instantiate service
  var profession;
  beforeEach(inject(function (_profession_) {
    profession = _profession_;
  }));

  it('should do something', function () {
    expect(!!profession).toBe(true);
  });

});
