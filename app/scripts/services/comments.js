'use strict';

var comments = ['$http', '$rootScope', function CommentsFactory ($http, $rootScope) {
  return {
    getComments: function(queryId) {
      return $http({
        method: 'GET',
        url: 'getComments',
        params: {queryId: queryId}
      }).success(function(data) {
        return data;
      });
    },
    addComment: function(queryId, comment) {
      $http({
        method: 'POST',
        url: 'comment',
        data: {
          queryId: queryId,
          text: comment,
          date: new Date(),
          ownerPic: "images/me.jpg"
        }
      });
    }
  };
}];


angular.module('mainApp').factory('comments', comments);