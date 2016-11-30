(function() {
    'use strict';

    angular
        .module('app')
        .factory('robotFactory', robotFactory);

    robotFactory.$inject = ['$http'];

    /* @ngInject */
    function robotFactory($http) {
        var service = {

            getRoboPic: getRoboPic

        };
        return service;

        ////////////////

        function getRoboPic(numbersOutput) {
        	return $http
        		.get(
        			'https://robohash.p.mashape.com/index.php?text='+ encodeURIComponent(numbersOutput),
        			{
        			headers: {
        				'X-Mashape-Key': 'ki6g6gXivpmshpwBYPVUHgLUSjXqp1pc4QRjsn3Xvy55BqVEnO'
        			}
        		});
        }
    }
})();