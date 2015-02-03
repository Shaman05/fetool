'use strict';

requirejs.config({
  paths: {
    angular: 'bower_components/angular/angular',
    angularRoute: 'bower_components/angular-route/angular-route',
    text: 'bower_components/requirejs-text/text'
  },
  shim: {
    'angular': {'exports': 'angular'},
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