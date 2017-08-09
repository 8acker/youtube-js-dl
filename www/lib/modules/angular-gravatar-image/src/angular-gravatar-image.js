(function() {
  'use strict';

  angular
    .module('bgn.GravatarImage', ['bgn.md5'])
    .directive('gravatarImage', gravatarImage);

  function gravatarImage() {
    var directive = {
      restrict: 'EA',
      scope: {
        email: '@'
      },
      template: '<img ng-src="{{url}}" />',
      controller: GravatarImageController,
      link: link
    };

    return directive;

    function link(scope, element, attrs, controller) {
      var url = 'http://www.gravatar.com';
      var parameters = '';

      if (attrs.ssl) {
        url = 'https://secure.gravatar.com';
      }

      if (attrs.size) {
        parameters += 'size=' + attrs.size;
      }

      if (attrs.default) {
        parameters += '&default=' + attrs.default;
      }

      if (attrs.forcedefault) {
        parameters += '&forcedefault=' + attrs.forcedefault;
      }

      if (attrs.rating) {
        parameters += '&rating=' + attrs.rating;
      }

      scope.url = url + '/avatar/' + controller.emailHash;

      if (parameters !== '') {
        scope.url += '?' + parameters;
      }
    }
  }

  GravatarImageController.$inject = ['$scope', 'md5'];

  function GravatarImageController($scope, md5) {
    this.emailHash = md5.encrypt($scope.email);
  }

}());