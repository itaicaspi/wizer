'use strict';

angular.module('mainApp').run(function($http) {
  $http.get('json/cat.json').success(function(response) {
    model.cat = angular.fromJson(response);
  });
});

var FeedCtrl = function(search, queries, comments, users, $http, $scope, $filter){
    var self = this;

    self.sort = 'Most Recent';
    self.topics = ['Science & Bussiness'];
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
    $scope.$on('updateFeed', self.updateFeed);

    // User access
    self.loggedIn = false;
    self.user = {
      name: '',
      email: '',
      pic: ''
    };
    $scope.$on('login', function() {
      self.loggedIn = true;
      self.user = users.user;
    });
    $scope.$on('logout', function() {
      self.loggedIn = false;
      self.user = {};
    });


    $scope.loadTags = function(query) {
      return $filter('filter')(model.cat, query);
    };
    self.getTopics = function() {
      return self.topics;
    };
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
    self.addComment = function(queryId, comment) {
      comments.addComment(users.user, queryId, comment);
      angular.forEach(self.queries, function(query) {
        if (query._id == queryId) {
          query.comments.push({
            text: comment,
            date: new Date(),
            ownerPic: users.user.pic
          });
        }
      });
      self.comment = '';
    };
    self.validateKey = function(event, queryId, comment) {
      if (event.which === 13) { // enter
        self.addComment(queryId, comment);
      }
    };
  };

angular.module('mainApp').controller('FeedCtrl', FeedCtrl);