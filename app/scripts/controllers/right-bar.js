'use strict';

var RightBarCtrl = function($scope){
	var self = this;
	self.mentors = [{
		name: 'James Johnes',
		profession: 'Musician',
		image: 'images/profile1.jpg',
		experience: 90
	},
	{
		name: 'Bran Davie',
		profession: 'Chemistry Teacher',
		image: 'images/profile2.jpg',
		experience: 70
	},
	{
		name: 'Cooper Nelson',
		profession: 'Actor',
		image: 'images/profile3.jpg',
		experience: 50
	}];
};


angular.module('mainApp').controller('RightBarCtrl', RightBarCtrl);
