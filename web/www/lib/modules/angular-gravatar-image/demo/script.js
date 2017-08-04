(function(angular) {
  'use strict';

  angular.module('gravatarImageExample', ['bgn.GravatarImage'])
    .controller('GravatarImageController', ['$scope', function($scope) {
      $scope.email = 'deerawan@gmail.com';
    }]);

})(window.angular);