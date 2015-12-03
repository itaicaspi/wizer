'use strict';

var SideMenuCtrl = function ($scope, $modal, users, $cookies) {
  var self = this;

  

  // Setup modals
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

  // User access
  self.loggedIn = false;
  self.user = {
    name: '',
    email: '',
    pic: ''
  };
  self.logOut = function() {
    self.loggedIn = false;
    users.logOut();
  }
  $scope.$on('login', function() {
    self.loggedIn = true;
    self.user = users.user;
  });

  // Session parameters
  var sessionToken = $cookies.get('userToken');
  var sessionEmail = $cookies.get('userEmail');
  
  users.validateToken(sessionEmail, sessionToken).then(function(data) {
    if (data.data) {
      var userInfo = users.getUserInfo(sessionEmail);
      userInfo.then(function(data) {
        self.user = data.data;
        users.logIn(self.user);
      });
    }
  });

  // Setup menu items behavior
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
