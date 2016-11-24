/** scripts/controllers/AboutController.js */

define([
    './module'
], function (controllers) {

    'use strict';

    controllers.controller('AboutCtrl', AboutCtrl);

    function AboutCtrl() {
        var vm = this;
        vm.message = 'This is About page.';
    }

});