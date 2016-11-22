(function() {

    'use strict';

    angular
        .module('myApp')
        .factory('OrangFactory', OrangFactory);

    function OrangFactory($resource) {

        // ngResource call to our static data
        var entries = $resource('resources/orang.json');

        function getEntries() {

            // $promise.then allows us to intercept the results
            // which we will use later
            return entries.query().$promise.then(function(results) {
                return results;
            }, function(error) { // Check for errors
                console.log(error);
            });

        }

        return { getEntries: getEntries };

    }

})();
