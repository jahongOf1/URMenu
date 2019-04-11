var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
// var restaurant_ = require('../model/restaurant');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const url = 'mongodb+srv://hackthon:hackthon@cluster0-bdgux.mongodb.net/test?retryWrites=true';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, client) {
    if (err) client.close();
    else
    {
      const db = client.db('test');
      var reg = '';
      const cursor = db.collection('foursquare_restaurant').find().toArray(function(err, documents) {
          var reg = [];
          documents.forEach(function(x) {
            reg.push(x.venue.name);
          });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(reg)); 
        client.close();
    });
  }
  });
});

router.get('/:name', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
