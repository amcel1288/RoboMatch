(function() {
    'use strict';

    angular
        .module('app')
        .factory('numbersFactory', numbersFactory);

    numbersFactory.$inject = ['$http'];

    /* @ngInject */
    function numbersFactory($http) {
        var service = {

            getString: getString

        };
        return service;

        ////////////////

        function getString(number) {
        	return $http
        		.get('https://numbersapi.p.mashape.com/'+number+'/trivia', {
        			headers: {
        				'X-Mashape-Key': 'ki6g6gXivpmshpwBYPVUHgLUSjXqp1pc4QRjsn3Xvy55BqVEnO'
        			}
        		});
        }

    }
})();