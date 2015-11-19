'use strict';

var SignUpModalCtrl = function($scope){
	var self = this;
	self.step = 1;
	self.profilePicHelper = "Choose your profile picture";
	self.bindHide = function(hide) {
      self.hide = hide;
    };
    self.next = function(){
    	self.step = self.step + 1;
    }
};

var SignUpLink = function(){
};

angular.module('mainApp').controller('SignUpModalCtrl', SignUpModalCtrl);
angular.module('mainApp').controller('SignUpLink', SignUpLink);