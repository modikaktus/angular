/**
 * Filename: scripts/controllers/index.js
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
    './HomeController',
    './AboutController'
], function() {});