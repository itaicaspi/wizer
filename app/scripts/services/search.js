'use strict';

var search = function SearchFactory () {
  var phrases = {
    phrase: '',
    getPhrase: function() {
      return this.phrase;
    },
    setPhrase: function(value) {
      this.phrase = value;
    }
  };
  return phrases;
};

angular.module('mainApp').factory('search', search);