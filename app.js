var pg         = require('pg');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');

var app     = express();
var router  = express.Router();
var port    = process.env.PORT || 8080;

var routes = require('./server/routes/index');

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'express');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Postgres Database
pg.defaults.ssl = true;

// Router & Stylesheets/Scripts
app.use('/', routes);
app.use(express.static(path.join(__dirname, './client', 'public')));

// Port
app.listen(port);
console.log('listening on port ' + port);

module.export = app;
