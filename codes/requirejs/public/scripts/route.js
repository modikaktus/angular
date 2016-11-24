/**
 * Filename: scripts/route.js
 *
 * Description: Defines the main routes in the application.
 * Note: The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define([
    './app'
], function (app) {

    'use strict';

    return app.config(function ($routeProvider, $locationProvider) {

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });

    });

});