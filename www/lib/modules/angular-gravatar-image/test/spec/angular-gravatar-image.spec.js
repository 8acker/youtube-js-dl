'use strict';

describe('angular-gravatar-image', function() {

  var $scope, element, $compile;

  beforeEach(module('bgn.GravatarImage'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  it('should initialize with email', function() {
    element = angular.element('<gravatar-image email="deerawan@gmail.com"></gravatar-image>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('img').attr('src')).toEqual('http://www.gravatar.com/avatar/71a6523c5915c0ee79a79a137c1b2be0');
  });

  it('should initialize with size attribute', function() {
    element = angular.element('<gravatar-image email="deerawan@gmail.com" size="200"></gravatar-image>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('img').attr('src')).toEqual('http://www.gravatar.com/avatar/71a6523c5915c0ee79a79a137c1b2be0?size=200');
  });

  it('should support ssl url', function() {
    element = angular.element('<gravatar-image email="deerawan@gmail.com" ssl=true></gravatar-image>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('img').attr('src')).toEqual('https://secure.gravatar.com/avatar/71a6523c5915c0ee79a79a137c1b2be0');
  });

  it('should display all parameters correctly', function() {
    element = angular.element('<gravatar-image email="deerawan@gmail.com" size="200" default="retro" forcedefault="y" rating="pg"></gravatar-image>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('img').attr('src')).toEqual('http://www.gravatar.com/avatar/71a6523c5915c0ee79a79a137c1b2be0?size=200&default=retro&forcedefault=y&rating=pg');
  });
});