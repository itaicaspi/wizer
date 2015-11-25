'use strict';

var FeedCtrl = function(search, queries, $http, $scope){
    var self = this;

    self.sort = 'Interesting';
    self.topics = 'Science & Bussiness';
    self.isCommenting = false;

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
    self.sortKey = function() {
      if (self.sort == 'Most Recent') {
        return 'date';
      } else if (self.sort == 'Interesting') {
        return 'comments.length';
      } else {
        return 'query_id';
      }
    };
  };

angular.module('mainApp').controller('FeedCtrl', FeedCtrl);