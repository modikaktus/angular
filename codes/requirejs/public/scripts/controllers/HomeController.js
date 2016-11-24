/** scripts/controllers/HomeController.js */

define([
    './module'
], function (controllers) {

    'use strict';

    controllers.controller('HomeCtrl', HomeCtrl);

    function HomeCtrl() {
        var vm = this;
        vm.message = 'This is Home page.';
    }

});