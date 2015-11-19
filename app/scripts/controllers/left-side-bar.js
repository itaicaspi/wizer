'use strict';

var LeftSideBarCtrl = function($http, $scope){
  	$scope.price = 0.7;
  	$scope.uploadFile = function(files) {
	    var fd = new FormData();
	    fd.append('file', files[0]);
	    var uploadUrl = 'upload.js';
	    $http.post(uploadUrl, fd, {
	        withCredentials: false,
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).success(function(data){
	    	console.log(data);
	    }).error(function(data) {
	    	console.log(data);
	    });
	};
  };

angular.module('mainApp').controller('LeftSideBarCtrl', LeftSideBarCtrl);