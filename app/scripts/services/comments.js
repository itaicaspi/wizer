'use strict';

var comments = ['$http', '$rootScope', function CommentsFactory ($http, $rootScope) {
  return {
    getComments: function(queryId) {
      return $http({
        method: 'GET',
        url: 'api/getComments',
        params: {queryId: queryId}
      }).success(function(data) {
        return data;
      });
    },
    addComment: function(user, queryId, comment) {
      $http({
        method: 'POST',
        url: 'api/comment',
        data: {
          queryId: queryId,
          text: comment,
          date: new Date(),
          ownerPic: user.pic
        }
      });
    }
  };
}];


angular.module('mainApp').factory('comments', comments);