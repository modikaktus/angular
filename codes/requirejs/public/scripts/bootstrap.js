/**
 * Filename: scripts/bootstrap.js
 *
 * Description: Bootstraps angular onto the window.document node
 * Note: The ng-app attribute should not be on the index.html when using ng.bootstrap
 */

define([
    'require',
    'angular',
    'app',
    'route'
], function (require, ng) {

    'use strict';

    /*
     * Place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app'])
    });

});