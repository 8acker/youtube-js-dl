'use strict';

describe('md5', function() {

  var md5;

  beforeEach(module('bgn.md5'));

  beforeEach(inject(function(_md5_) {
    md5 = _md5_;
  }));

  it('can encrypt', function() {
    var encrypted = md5.encrypt('deerawan@gmail.com');
    expect(encrypted).toEqual('71a6523c5915c0ee79a79a137c1b2be0');
  });
});