'use strict';

var FeedCtrl = function(search, queries, comments, $http, $scope){
    var self = this;

    self.sort = 'Interesting';
    self.topics = 'Science & Bussiness';
    self.isCommenting = false;

    self.extended = -1;
    self.updateFeed = function() {
      queries.getQueries().then(function(data) {
        self.queries = data.data;
        angular.forEach(self.queries, function(query) {
          comments.getComments(query._id).then(function(data) {
            query.comments = data.data;
          });
        });
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
    self.validateKey = function(event, queryId, comment) {
      if (event.which === 13) { // enter
        comments.addComment(queryId, comment);
        angular.forEach(self.queries, function(query) {
          if (query._id == queryId) {
            query.comments.push({
              text: comment,
              date: new Date(),
              ownerPic: 'images/me.jpg'
            });
          }
        });
        self.comment = '';
      }
    };
  };

angular.module('mainApp').controller('FeedCtrl', FeedCtrl);