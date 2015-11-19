'use strict';

var queries = ['$http', '$rootScope', function QueriesFactory ($http, $rootScope) {
  return {
    showQuerySubmission: function(phrase) {
      $rootScope.$emit('showQuerySubmission', phrase);
    },
    getQueries: function() {
      return $http({
        method: 'GET',
        url: 'json/queries.json'
      }).success(function(data) {
        return data;
      });
    },
    addQuery: function(question, description) {
      $http({
        method: 'POST',
        url: 'ask',
        data: {
          ownerPic: 'images/profile3.jpg',
          category: 'Biology',
          question: question,
          description: description
        }
      });
      $rootScope.$broadcast('updateFeed');
    }
  };
}];


angular.module('mainApp').factory('queries', queries);