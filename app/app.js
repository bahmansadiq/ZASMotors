(function() {
    'use strict';

        angular.module('app', [
         'ui.router',
         'toastr',
         'LocalStorageModule',
         'ngIdle'
         //,'ngFileUpload'
         ])
        .value ('DealerAPIBaseURL', 'http://localhost:57450/api/')
       .config(function($stateProvider,
                        $urlRouterProvider,
                        localStorageServiceProvider
                        ){
         // Local storage config
            $urlRouterProvider.otherwise("/home");
            $stateProvider   
            .state('home', {
                url: "/home",
                templateUrl: "app/partials/Home.html",
                controller: 'zasMotorsController',
                controllerAs: 'vm'
            })
             .state('home.dealer', {
                url: "/dealer",
                templateUrl: "app/partials/Dealer.html",
                 parent: "home",
                controller: 'zasMotorsController',
                controllerAs: 'vm'
                })

            .state('home.inventory', {
                url: "/inventory",
                templateUrl: "app/partials/Inventory.html",
                 parent: "home",
                controller: 'zasMotorsController',
                controllerAs: 'vm'
            })

             .state('home.contact', {
                url: "/customer",
                templateUrl: "app/partials/Contact.html",
                 parent: "home",
                controller: 'zasMotorsController',
                controllerAs: 'vm'
            })
             .state('home.login', {
                url: "/login",
                templateUrl: "app/partials/Login.html",
                 parent: "home",
                controller: 'AuthController',
                controllerAs: 'auth'
              }) 
              .state('home.direction', {
                url: "/direction",
                templateUrl: "app/partials/Direction.html",
                 parent: "home",
                controller: 'zasMotorsController',
                controllerAs: 'vm'
            });

      });
})();