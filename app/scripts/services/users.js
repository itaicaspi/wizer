'use strict';

var users = ['$http', '$rootScope', '$cookies', function UsersFactory ($http, $rootScope, $cookies) {
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
    user: {},
    generateToken: function(user) {
      return $http({
        method: 'GET',
        url: 'getToken',
        params: {email: user.email}
      }).success(function(data) {
        return data;
      });
    },
    validateToken: function(email, token) {
      return $http({
        method: 'GET',
        url: 'testToken',
        params: {email: email, token: token}
      }).success(function(data) {
        return data;
      });
    },
    logIn: function(user) {
      this.user = user;
      this.loggedIn = true;
      $cookies.put('userEmail', this.user.email);
      this.generateToken(user).then(function(data) {
        $cookies.put('userToken', data.data);
      });
      $rootScope.$broadcast('login');
    },
    logOut: function() {
      this.user = {};
      this.loggedIn = false;
      $cookies.put('userToken', -1);
      $rootScope.$broadcast('logout');
    }
  };
}];


angular.module('mainApp').factory('users', users);