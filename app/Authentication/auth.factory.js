(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$http', '$q', 'DealerAPIBaseURL' ];

    /* @ngInject */
    function AuthFactory($http, $q, DealerAPIBaseURL) {
        var service = {
            dealerRegister: dealerRegister,
            dealerAuth: dealerAuth
        };
        return service;

        ////////////////


        function dealerRegister(newDealerInfo) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: DealerAPIBaseURL+'register',
                    data: newDealerInfo,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the new user to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the new uswer from authFactory to the Database!");

                    });
            return defer.promise;
        }
        ///User authentication starts here///
         function dealerAuth(newDealerInfo) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: DealerAPIBaseURL +'authenticate',
                    data: newDealerInfo,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject('Not able to post the Dealer Info to the Database!')
                        }
                    },
                    function(error) {
                        defer.reject(error + "Not able to post the Dealer info from zasMotorsFactory to the Database!");

                    });
            return defer.promise;
        }
        //Dealer authentication ends here
    }
})();