(function() {

    'use strict';

    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    function HomeController() {

        var vm = this;
        vm.message = 'This is Home page';

    }

})();
