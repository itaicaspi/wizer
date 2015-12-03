'use strict';

var AskCtrl = function (search, queries, users) {
	var self = this;

	self.searchPhrase = '';
	self.postQuery = function(phrase) {
		if (users.loggedIn) {
			self.phrase = '';
			queries.showQuerySubmission(phrase);
		} else {
			alert('not logged in');
			// TODO: signup / login modal
		}
	};
	self.validateEnter = function(event, phrase) {
		if (event.which === 13) { // enter
			self.postQuery(phrase);
		}
	};
};

angular.module('mainApp').controller('AskCtrl', AskCtrl);
