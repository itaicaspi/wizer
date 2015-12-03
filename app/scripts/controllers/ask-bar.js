'use strict';

var AskCtrl = function (search, queries, users, $modal, $scope) {
	var self = this;

	var loginModal = $modal({controller: 'LogInModalCtrl as login', templateUrl: 'views/log-in.html', show: false});
  self.showLogInModal = function() {
    loginModal.$promise.then(loginModal.show);
  };
  self.hideLogInModal = function() {
    loginModal.$promise.then(loginModal.hide);
  };

	self.searchPhrase = '';
	self.postQuery = function(phrase) {
		if (users.loggedIn) {
			self.phrase = '';
			queries.showQuerySubmission(phrase);
		} else {
			self.showLogInModal();
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
