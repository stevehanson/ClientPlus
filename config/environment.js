module.exports = function (compound) {

    var express = require('express');
    var sass = require("node-sass");
    var app = compound.app;

    app.configure(function(){
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        //app.set('cssEngine', 'sass');
        app.use(sass.middleware({
            src: app.root+'/public',
            dest: app.root + '/public',
            debug: true
        }));
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        app.use(express.session({secret: 'secret'}));
        app.use(express.methodOverride());
        app.use(app.router);
    });

};
