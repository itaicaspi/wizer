'use strict';

var AskCtrl = function (search, queries) {
	var self = this;

	self.searchPhrase = '';
	self.postQuery = function(phrase) {
		self.phrase = '';
		queries.showQuerySubmission(phrase);
	};
	self.validateEnter = function(event, phrase) {
		if (event.which === 13) { // enter
			self.postQuery(phrase);
		}
	};
};

angular.module('mainApp').controller('AskCtrl', AskCtrl);
