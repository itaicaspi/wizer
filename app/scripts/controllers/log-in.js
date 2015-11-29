'use strict';

var LogInModalCtrl = function($rootScope, $scope, $http, $modal, users){
	var self = this;

  self.user = {
    name: '',
    email: '',
    password: ''
  };

  self.tryLogin = function() {
    var result = users.checkUserCredentials(self.user.email, self.user.password).then(function (data) {
      if (data.data.allowed) {
        var userInfo = users.getUserInfo(self.user.email);
        userInfo.then(function(data) {
          self.user = data.data;
          users.loggedIn = true;
          users.user = self.user;
          $rootScope.$broadcast('login');
          $scope.hideLogInModal();
        });
      } else {
        return false;
      }
    });
  };

  self.validateKey = function(event) {
		if (event.which === 13) { // enter
			self.tryLogin();
		}
	};
};

angular.module('mainApp').controller('LogInModalCtrl', LogInModalCtrl);
