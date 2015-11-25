'use strict';

var SideMenuCtrl = function ($scope, $modal) {
  var self = this;

  var signupModal = $modal({controller: 'SignUpModalCtrl as signup', templateUrl: 'views/sign-up.html', show: false});
  $scope.showModal = function() {
    signupModal.$promise.then(signupModal.show);
  };
  $scope.hideModal = function() {
    signupModal.$promise.then(signupModal.hide);
  };


  self.loggedIn = false;

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
