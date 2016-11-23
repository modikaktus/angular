(function() {

    'use strict';

    angular
        .module('myApp', [
            'ngRoute',
            'ui.bootstrap'
        ])

        // Configure our routes
        .config(function ($routeProvider, $locationProvider) {

            // use the HTML5 History API
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutController'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        });

})();
