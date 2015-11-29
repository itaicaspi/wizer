'use strict';

var SideMenuCtrl = function ($scope, $modal, users) {
  var self = this;

  var signupModal = $modal({controller: 'SignUpModalCtrl as signup', templateUrl: 'views/sign-up.html', show: false});
  var loginModal = $modal({controller: 'LogInModalCtrl as login', templateUrl: 'views/log-in.html', show: false});
  $scope.showSignUpModal = function() {
    signupModal.$promise.then(signupModal.show);
  };
  $scope.hideSignUpModal = function() {
    signupModal.$promise.then(signupModal.hide);
  };
  $scope.showLogInModal = function() {
    loginModal.$promise.then(loginModal.show);
  };
  $scope.hideLogInModal = function() {
    loginModal.$promise.then(loginModal.hide);
  };
  self.loggedIn = false;

  self.user = {
    name: '',
    email: '',
    pic: ''
  };

  $scope.$on('login', function() {
    self.loggedIn = true;
    self.user = users.user;
  });

  self.active = -1;
  self.current = 0;
  self.toggleActive = function(idx) {
    self.active = self.active === idx ? -1 : idx;
  };
  self.setCurrent = function(idx) {
    self.current = idx;
  };
  self.isCurrent = function(idx) {
    return self.current === idx;
  };
  self.menuItems = [
    {
      active: true,
      title: 'Home',
      icon: 'images/home.png',
      url: '/',
      badge: 0
    },
    {
      title: 'Profile',
      icon: 'images/profile.png',
      url: '/Profile',
      badge: 0
    },
    {
      title: 'Favorites',
      icon: 'images/favorites.png',
      url: '/Favorites',
      badge: 0
    },
    {
      title: 'Messaging',
      icon: 'images/message.png',
      url: '/Messaging',
      badge: 4
    },
    {
      title: 'Options',
      icon: 'images/options.png',
      url: '/Options',
      badge: 0
    }];

};

angular.module('mainApp').controller('SideMenuCtrl', SideMenuCtrl);
