(function() {
    'use strict';

    angular
        .module('app')
        .factory('catFactory', catFactory);

    catFactory.$inject = ['$http'];

    /* @ngInject */
    function catFactory($http) {
        var service = {

            getCat: getCat

        };
        return service;

        ////////////////

        function getCat() {
        	return $http
        		.get('https://nijikokun-random-cats.p.mashape.com/random', {
        			headers: {
        				'X-Mashape-Key': 'ki6g6gXivpmshpwBYPVUHgLUSjXqp1pc4QRjsn3Xvy55BqVEnO'
        			}
        		});
        }

    }
})();