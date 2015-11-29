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
});

var SignUpModalCtrl = function($scope, $http, $modal, users){
	var self = this;
	self.step = 1;
	self.profilePicHelper = "Choose your profile picture";

  self.next = function(){
  	self.alert = false;
  	if (self.step == 1 && self.passwordValid) {
  		var userInfo = users.getUserInfo(self.user.email);
  		userInfo.then(function(data) {
        if (data.data) {
        	self.step = self.step + 1;
        } else {
        	self.emailValid = false;
        	self.emailError = "The email seems to already be in use" + data.data;
        }
      });
      //users.checkUserCredentials(self.user.email, self.user.password);
  	} else if (self.step > 1 && self.step < 3) {
  		self.step = self.step + 1;
  	} else if (self.step == 3) {
  		self.user.pic = "images/profile3.jpg";
  		self.user.email = angular.lowercase(self.user.email);
  		users.addUser(self.user);
  		$scope.hideSignUpModal();
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

  self.emailValid = false;
  self.emailDirty = false;
  self.passwordValid = false;
  self.passwordDirty = false;

	self.passwordValidator = function() {
		self.passwordValid = false;
		if (!/[A-Z]/.test(self.user.password)) {
			self.passwordError = "Password should contain uppercase letters";
		} else if (!/[a-z]/.test(self.user.password)) {
			self.passwordError = "Password should contain lowercase letters";
		} else if (!/[0-9]/.test(self.user.password)) {
			self.passwordError = "Password should contain numbers";
		} else if (self.user.password.length < 6) {
			self.passwordError = "Password should contain at least 6 characters";
		} else {
			self.passwordError = "";
			self.passwordValid = true;
		}

    self.passwordDirty = true;
  };

	self.emailValidator = function() {
		self.emailValid = false;
		if (!/\S+@\S+\.\S+/.test(self.user.email)) {
			self.emailError = "The email does not seem to be valid";
		} else {
			self.emailError = "";
			self.emailValid = true;
		}
	  self.emailDirty = true;
  };

  self.validateKey = function(event) {
		if (event.which === 13) { // enter
			self.next();
		}
	};
};

angular.module('mainApp').controller('SignUpModalCtrl', SignUpModalCtrl);
