(function() {
    'use strict';

    angular
        .module('app')
        .factory('zasMotorsFactory', zasMotorsFactory);

    zasMotorsFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function zasMotorsFactory($http, $q) {
        var service = {
            getInventory: getInventory,
            postInventory: postInventory,
            getDealer: getDealer
        };
        return service;
// have to mension CRUD methods for the Inventory//

/////////************************///////////////
/////// get all the inventories 
/////////************************///////////////
        function getInventory() {

        	 var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/Inventories/'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get all the inventories from the database in factory");
                    });
            return defer.promise;
        }

/////////************************///////////////
/////// post a new inventory
/////////************************///////////////

        function postInventory(newInventory) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: 'http://localhost:57450/api/Inventories',
                    data: newInventory,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the new inventory to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the new customer from zasMotorsFactory to the Database!");

                    });
            return defer.promise;
        }



// have to mension CRUD methods for dealer//

/////////************************///////////////
/////// get all the dealers
/////////************************///////////////

        function getDealer() {

             var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'http://localhost:57450/api/Dealers/'
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                        } else {
                            defer.reject('No data found in file!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "unable to get all the inventories from the database in factory");
                    });
            return defer.promise;
        }

    }
})();