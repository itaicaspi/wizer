'use strict';

var SignUpModalCtrl = function($scope, $http){
	var self = this;
	self.step = 1;
	self.profilePicHelper = "Choose your profile picture";
	self.bindHide = function(hide) {
      self.hide = hide;
    };
    self.next = function(){
    	if (self.step == 1 && self.passwordValid) {
    		self.step = self.step + 1;
    	} else if (self.step > 1) {
    		self.step = self.step + 1;
    	}
    };
    self.prev = function() {
    	self.step = self.step - 1;
    };
    $scope.educations = [
        "High school student",
        "High school graduate",
        "College student",
        "Associate degree",
        "Bachelor's degree",
        "Master's degree",
        "Professional degree",
        "Doctorate"
    ];

    $scope.loadLanguages = function() {
        var url = 'json/languages.json';
        $http.get(url).success(function(response) {
        	$scope.languages = angular.fromJson(response);
    	}).error(function() {
            console.log('languages json file not found');
        });
    };
    $scope.loadOccupations = function() {
        var url = 'json/occupations.json';
        $http.get(url).success(function(response) {
        	$scope.occupations = angular.fromJson(response);
    	}).error(function() {
            console.log('occupations json file not found');
        });
    };

    $scope.loadOccupations();
    $scope.loadLanguages();

    self.emailValid = false;
    self.emailDirty = false;
    self.passwordValid = false;
    self.passwordDirty = false;

	self.passwordValidator = function() {

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
		console.log("hello");
		var emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		if (!emailRegex.test(self.email)) {
			self.emailError = "The email does not seem to be valid";
		} else {

			self.emailError = "";
			self.emailValid = true;
		}

        self.emailDirty = true;
    };

};

var SignUpLink = function(){

};

angular.module('mainApp').controller('SignUpModalCtrl', SignUpModalCtrl);
angular.module('mainApp').controller('SignUpLink', SignUpLink);