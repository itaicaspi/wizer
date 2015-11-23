'use strict';

/**
 * @ngdoc overview
 * @name mainApp
 * @description
 * # mainApp
 *
 * Main module of the application.
 */
(function() {


angular
  .module('mainApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider, $popoverProvider, $modalProvider) {
    angular.extend($popoverProvider.defaults, {
      html: true
    });
    angular.extend($modalProvider.defaults, {
      html: true
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('feed', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/feed.html',
      controller: 'FeedCtrl',
      controllerAs: 'feed'
    };
  })
  .directive('askBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/ask-bar.html',
      controller: 'AskCtrl',
      controllerAs: 'ask'
    };
  })
  .directive('querySubmission', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/query-submission.html',
      controller: 'QuerySubmissionCtrl',
      controllerAs: 'query'
    };
  })
  .directive('leftSideBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/left-side-bar.html',
      controller: 'LeftSideBarCtrl',
      controllerAs: 'leftside'
    };
  })
  .directive('sideMenu', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/side-menu.html',
      controller: 'SideMenuCtrl',
      controllerAs: 'menu'
    };
  })
  .directive('signUpForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/sign-up.html',
      controller: 'SignUpCtrl',
      controllerAs: 'signup'
    };
  })
  .directive('rightBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/right-bar.html',
      controller: 'RightBarCtrl',
      controllerAs: 'right'
    };
  })
  .controller('SortPopoverCtrl', function($scope) {
    $scope.popover = {title: 'Sort by'};
  })
  .controller('TopicsPopoverCtrl', function($scope) {
    $scope.popover = {title: 'Which topics interest you?'};
  })
  .controller('DropCtrl', function ($scope) {
    $scope.dropzoneConfig = {
      'options': { // passed into the Dropzone constructor
        'url': 'upload.php',
        'previewsContainer': '#test',
        'thumbnailHeight': '260',
        'thumbnailWidth': '260',
        'previewTemplate': document.querySelector('#preview').innerHTML
      }/*,
      'eventHandlers': {
        'sending': function (file, xhr, formData) {
        },
        'success': function (file, response) {
        }
      }*/
    };
  })
  .directive('dropzone', function () {
    return function (scope, element, attrs) {
      var config, dropzone;

      config = scope[attrs.dropzone];

      dropzone = new Dropzone(element[0], config.options);
      dropzone.on("addedfile", function(file) {
        var l = element[0].childNodes.length;
        for (var i = 0; i < l - 1; i++) {
          element[0].removeChild(element[0].firstChild);
        }
      });
      angular.forEach(config.eventHandlers, function (handler, event) {
        dropzone.on(event, handler);
      });
    };
  })
  .directive('password', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {
        function customValidator(password) {
            if (/[A-Z]/.test(password)) {
                ctrl.$setValidity('uppercaseValidator', true);
            } else {
                ctrl.$setValidity('uppercaseValidator', false);
            }

            if (/[a-z]/.test(password)) {
                ctrl.$setValidity('lowercaseValidator', true);
            } else {
                ctrl.$setValidity('lowercaseValidator', false);
            }

            if (/[0-9]/.test(password)) {
                ctrl.$setValidity('numberValidator', true);
            } else {
                ctrl.$setValidity('numberValidator', false);
            }

            if (password.length >= 6) {
                ctrl.$setValidity('sixCharactersValidator', true);
            } else {
                ctrl.$setValidity('sixCharactersValidator', false);
            }

            return password;
        }

        ctrl.$parsers.push(customValidator);
      }
    };
  });
})();


