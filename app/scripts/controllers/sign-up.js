'use strict';

var model = {
	educations: ["High school student",
				      "High school graduate",
				      "College student",
				      "Associate degree",
				      "Bachelor's degree",
				      "Master's degree",
				      "Professional degree",
				      "Doctorate"]
};

angular.module('mainApp').run(function($http) {
  $http.get('json/languages.json').success(function(response) {
  	model.languages = angular.fromJson(response);
	});
  $http.get('json/occupations.json').success(function(response) {
  	model.occupations = angular.fromJson(response);
	});
  $http.get('json/emails.json').success(function(response) { // TODO: because of security issues, this check should be moved to the server
  	model.emails = angular.fromJson(response);
	});
});

var SignUpModalCtrl = function($scope, $http, $modal){
	var self = this;
	self.step = 1;
	self.profilePicHelper = "Choose your profile picture";

  self.next = function(){
  	self.alert = false;
  	if (self.step == 1 && self.passwordValid) {
  		self.step = self.step + 1;
  	} else if (self.step > 1) {
  		self.step = self.step + 1;
  	} else {
  		self.alert = true;
  	}
  };
  self.prev = function() {
  	self.step = self.step - 1;
  };

  $scope.educations = model.educations;
  $scope.languages = model.languages;
  $scope.occupations = model.occupations;
  $scope.emails = model.emails;

  self.emailValid = false;
  self.emailDirty = false;
  self.passwordValid = false;
  self.passwordDirty = false;

	self.passwordValidator = function() {
		self.passwordValid = false;
		if (!/[A-Z]/.test(self.password)) {
			self.passwordError = "Password should contain uppercase letters";
		} else if (!/[a-z]/.test(self.password)) {
			self.passwordError = "Password should contain lowercase letters";
		} else if (!/[0-9]/.test(self.password)) {
			self.passwordError = "Password should contain numbers";
		} else if (self.password.length < 6) {
			self.passwordError = "Password should contain at least 6 characters";
		} else {
			self.passwordError = "";
			self.passwordValid = true;
		}

    self.passwordDirty = true;
  };

	self.emailValidator = function() {
		self.emailValid = false;
		if (!/\S+@\S+\.\S+/.test(self.email)) {
			self.emailError = "The email does not seem to be valid";
		} else if ($scope.emails.indexOf(self.email) > -1) {
			self.emailError = "This email address is already in use";
		} else {
			self.emailError = "";
			self.emailValid = true;
		}
	  self.emailDirty = true;
  };
};

angular.module('mainApp').controller('SignUpModalCtrl', SignUpModalCtrl);
