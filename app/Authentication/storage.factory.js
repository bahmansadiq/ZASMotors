(function() {
    'use strict';

    angular
        .module('app')
        .factory('storageFactory', storageFactory);

    storageFactory.$inject = ['localStorageService'];

    /* @ngInject */
    function storageFactory(localStorageService) {
        var service = {
            setLocalStorage: setLocalStorage,
            getLocalStorage: getLocalStorage
        };
        return service;

        ////////////////
// stores an object with key value(token) in local storage.

        function setLocalStorage(key, value) {
        	return  localStorageService.set(key, value);
        }
// get the stored token from local storage.
        function getLocalStorage(key){
        	return localStorageService.get(key);

        }
    }
})();