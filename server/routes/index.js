var pg        = require('pg');
var path      = require('path');
var express   = require('express');
var database  = require('../../dbString');

var router  = express.Router();

// Index Page Routing
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});



// Data GETS
router.get('/visitor-data', function(req, res, next) {
  var results = [];

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    var query = client.query("SELECT DISTINCT sitevisitors FROM Office;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.get('/plant-data', function(req, res, next) {
  var results = [];

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    var query = client.query("SELECT DISTINCT plantwater FROM Office;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.get('/drinks-data', function(req, res, next) {
  var results = [];

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    var query = client.query("SELECT DISTINCT drinkscount FROM Office;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.get('/office-temp-data', function(req, res, next) {
  var results = [];

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    var query = client.query("SELECT DISTINCT officetemp FROM Office;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.get('/outside-temp-data', function(req, res, next) {
  var results = [];

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    };

    var query = client.query("SELECT DISTINCT outsidetemp FROM Office;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});



// Data PUTS
router.put('/office-temp-data', function(req, res) {
  var results = [];
  
  var data = {newtemp: req.body.newtemp, oldtemp: req.body.oldtemp};

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    };

    client.query("UPDATE office SET officetemp=($1) WHERE officetemp=($2)", [data.newtemp, data.oldtemp]);

    var query = client.query("SELECT DISTINCT officetemp FROM Office;");

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        done();
        return res.json(results);
    });
  });
});

router.put('/drinks-data', function(req, res) {
  var results = [];
  
  var data = {newcount: req.body.newcount, oldcount: req.body.oldcount};

  pg.connect(database.dbString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    };

    client.query("UPDATE office SET drinkscount=($1) WHERE drinkscount=($2)", [data.newcount, data.oldcount]);

    var query = client.query("SELECT DISTINCT drinkscount FROM Office;");

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        done();
        return res.json(results);
    });
  });
});


module.exports = router;
