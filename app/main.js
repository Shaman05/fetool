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
    gui: 'core/gui',
    file: 'core/file'
  },
  shim: {
    'bootstrap': ['jquery'],
    'angular': {
      deps: ['bootstrap'],
      'exports': 'angular'
    },
    'angularRoute': ['angular'],
    'mode_markdown': ['codemirror']
  },
  priority: [
    "angular"
  ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

requirejs([
  'angular',
  'app',
  'gui',
  'routes'
], function (angular, app, gui) {
  angular.element(document.getElementsByTagName('html')[0]);
  angular.element().ready(function () {
    angular.bootstrap(document, [app.name]);
    setTimeout(function(){
      gui.showWin();
    }, 10);
  });
});