/**
 * Filename: scripts/main.js
 *
 * Description: Configure RequireJS
 */

require.config({

    // Aliases and paths of modules
    paths: {
        'angular': '../libs/angular/angular.min',
        'angular-route': '../libs/angular-route/angular-route.min',
        'angular-bootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'domReady': '../libs/requirejs-domready/domReady'
    },

    // Modules and their dependent modules
    shim: {
        // Angular does not support AMD out of the box
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        }
    },

    // Kick start application
    deps: ['./bootstrap']
});