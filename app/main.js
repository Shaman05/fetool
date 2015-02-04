'use strict';

requirejs.config({
  paths: {
    packageJSON: '../package.json',
    angular: 'bower_components/angular/angular.min',
    angularRoute: 'bower_components/angular-route/angular-route.min',
    text: 'bower_components/requirejs-text/text',
    jquery: 'bower_components/jquery/dist/jquery.min',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
    util: 'core/util',
    gui: 'core/gui'
  },
  shim: {
    'bootstrap': ['jquery'],
    'angular': {
      deps: ['bootstrap'],
      'exports': 'angular'
    },
    'angularRoute': ['angular']
  },
  priority: [
    "angular"
  ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

requirejs([
  'angular',
  'app',
  'routes'
], function (angular, app) {
  angular.element(document.getElementsByTagName('html')[0]);
  angular.element().ready(function () {
    angular.bootstrap(document, [app.name]);
  });
});