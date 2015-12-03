'use strict';

var QuerySubmissionCtrl = function (queries, search, $scope, $timeout, $window) {
	var self = this;

	self.question = '';
	self.show = false;

	self.richText = false;
	self.hide = function() {
		self.show = false;
		$timeout(function() {
	        var element = $window.document.getElementById('askinput');
	        if (element) {
	        	element.focus();
	        }
      	});
	};
	$scope.$on('showQuerySubmission', function(event, data) {
		self.question = data;
		self.show = true;
		$timeout(function() {
	        var element = $window.document.getElementById('query-description');
	        if (element) {
	        	element.focus();
	        }
      	});
	});
	self.addQuery = function (question, description, tags) {
		queries.addQuery(question, description, tags);
		search.setPhrase('');
		self.hide();
	};
	self.validateKey = function(event, question, description, tags) {
		if (event.which === 13) { // enter
			self.addQuery(question, description, tags);
		} else if (event.which === 27) { // escape
			self.hide();
		}
	};
	self.toggleEditor = function() {
		self.richText = !self.richText;
	};
};

angular.module('mainApp').controller('QuerySubmissionCtrl', QuerySubmissionCtrl);
