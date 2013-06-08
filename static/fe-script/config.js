/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 6/8/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

;seajs.config({

    base: 'fe-script/',

    alias: {
        'jquery': './static/jquery/jquery-1.7.2.min.js'
    },

    preload: ['jquery']
});
