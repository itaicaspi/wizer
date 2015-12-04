'use strict';

var AskCtrl = function (search, queries, users, $modal, $scope) {
	var self = this;

  var connectModal = $modal({controller: 'ConnectModalCtrl as login', templateUrl: 'views/connect.html', show: false});
  self.showConnectModal = function() {
    connectModal.$promise.then(connectModal.show);
  };
  self.hideConnectModal = function() {
    connectModal.$promise.then(connectModal.hide);
  };

	self.searchPhrase = '';
	self.postQuery = function(phrase) {
		if (users.loggedIn) {
			self.phrase = '';
			queries.showQuerySubmission(phrase);
		} else {
			self.showConnectModal();
		}
	};
	self.validateEnter = function(event, phrase) {
		if (event.which === 13) { // enter
			self.postQuery(phrase);
		}
	};
};

angular.module('mainApp').controller('AskCtrl', AskCtrl);
