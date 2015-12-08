'use strict';

var queries = ['$http', '$rootScope', function ($http, $rootScope) {
  return {
    showQuerySubmission: function(phrase) {
      $rootScope.$emit('showQuerySubmission', phrase);
    },
    getQueries: function() {
      return $http({
        method: 'GET',
        url: 'api/feed'
      }).success(function(data) {
        return data;
      });
    },
    addQuery: function(user, question, description, tags) {
      if (tags == "") tags = "General";
      console.log(tags);
      $http({
        method: 'POST',
        url: 'api/ask',
        data: {
          owner: user.email,
          ownerPic: user.pic,
          category: tags,
          question: question,
          description: description,
          date: new Date()
        }
      }).success(function() {
        $rootScope.$broadcast('updateFeed');
      });
    }
  };
}];


angular.module('mainApp').factory('queries', queries);