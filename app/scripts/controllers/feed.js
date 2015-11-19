'use strict';

var FeedCtrl = function(search, queries, $http, $scope){
    var self = this;

    self.sort = 'Interesting';
    self.topics = 'Science & Bussiness';

    self.extended = -1;
    self.updateFeed = function() {
      queries.getQueries().then(function(data) {
        self.queries = data.data;
      });
    };
    $scope.$on('updateFeed', function() {
      queries.getQueries().then(function(data) {
        self.queries = data.data;
      });
    });
    self.updateFeed();

  };

angular.module('mainApp').controller('FeedCtrl', FeedCtrl);