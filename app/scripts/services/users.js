'use strict';

var users = ['$http', '$rootScope', function UsersFactory ($http, $rootScope) {
  return {
    getUserInfo: function(email) {
      return $http({
        method: 'GET',
        url: 'users',
        params: {email: angular.lowercase(email)}
      }).success(function(data) {
        return data;
      });
    },
    addUser: function(user) {
      $http({
        method: 'POST',
        url: 'signup',
        data: user
      });
    },
    checkUserCredentials: function(email, password) {
      return $http({
        method: 'GET',
        url: 'signin',
        params: {
          email: angular.lowercase(email),
          password: password
        }
      }).success(function(data) {
        return data;
      });
    },
    loggedIn: false,
    user: {}
  };
}];


angular.module('mainApp').factory('users', users);