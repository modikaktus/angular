(function() {

    'use strict';

    angular
        .module('myApp')
        .controller('OrangEntries', OrangEntries);

    function OrangEntries(OrangFactory) {

        var vm = this;
        vm.entries = [];

        // Fetches the entries from the static JSON file
        // and puts the results on the vm.entries array
        OrangFactory.getEntries().then(function(results) {
            vm.entries = results;
            console.log(vm.entries);
        }, function(error) { // Check for errors
            console.log(error);
        });

    }

})();
