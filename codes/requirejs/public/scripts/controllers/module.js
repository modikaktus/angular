/**
 * Filename: scripts/controllers/module.js
 *
 * Description:
 * Attach controllers to this module.
 *
 * If you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 *
 * Below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 */

define([
    'angular'
], function (ng) {

    'use strict';

    return ng.module('app.controllers', []);

});