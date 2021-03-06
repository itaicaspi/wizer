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
    'ui.bootstrap',
    'mgcrea.ngStrap.modal',
    'textAngular',
    'ngTagsInput'
  ])
  .config(function ($routeProvider, $modalProvider, $provide) {
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
    $provide.decorator('$tooltipSuppressWarning', function () { return true; });
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating           
      taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['insertImage','insertLink', 'insertVideo']
      ];
      return taOptions;
    }]);
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
  .directive('rightBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/right-bar.html',
      controller: 'RightBarCtrl',
      controllerAs: 'right'
    };
  })
  .filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  })
  .controller('DropCtrl', function ($scope) {
    $scope.dropzoneConfig = {
      'options': { // passed into the Dropzone constructor
        'url': '/api/picUpload',
        'previewsContainer': '#test',
        'thumbnailHeight': '260',
        'thumbnailWidth': '260',
        'maxFiles': '1',
        'previewTemplate': document.querySelector('#preview').innerHTML,
        'autoProcessQueue': false,
        'acceptedFiles': 'image/*'
      },
      'eventHandlers': {
        'sending': function (file, xhr, formData) {
        },
        'success': function (file, response) {
        }
      }
    };

  })
  .directive('dropzone', function ($rootScope) {
    return function (scope, element, attrs) {
      var config, dropzone;

      config = scope[attrs.dropzone];

      $rootScope.dropzone = new Dropzone(element[0], config.options);
      $rootScope.dropzone.on("addedfile", function(file) {
        //$rootScope.$broadcast('fileLoaded');
        //scope.fileLoaded = true;
        var l = element[0].childNodes.length;
        for (var i = 0; i < l - 1; i++) {
          element[0].removeChild(element[0].firstChild);
        }
      });
      angular.forEach(config.eventHandlers, function (handler, event) {
        $rootScope.dropzone.on(event, handler);
      });

    };
  })
})();


