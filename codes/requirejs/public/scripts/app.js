/**
 * Filename: scripts/app.js
 *
 * Description:
 * Loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */

define([
    'angular',
    'angular-route',
    'angular-bootstrap',
    './controllers/index'
], function (ng) {

    'use strict';

    return ng.module('app', [
        'app.controllers',
        'ngRoute',
        'ui.bootstrap'
    ]);

});