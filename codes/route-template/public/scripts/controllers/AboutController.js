(function() {

    'use strict';

    angular
        .module('myApp')
        .controller('AboutController', AboutController);

    function AboutController() {

        var vm = this;
        vm.message = 'This is About page';

    }

})();
