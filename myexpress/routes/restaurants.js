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
            reg.push({'name': x.venue.name, 
            'address': x.venue.location.address,
            'location': {lat: x.venue.location.lat, lng: x.venue.location.lng}});
          });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(reg)); 
        client.close();
    });
  }
  });
});

//response name as well as coordinate;
router.get('/:name', function(req, res, next) {
  const url = 'mongodb+srv://hackthon:hackthon@cluster0-bdgux.mongodb.net/test?retryWrites=true';
  MongoClient.connect(url, function(err, client) {
  if (err) client.close();
    else
    {
      const db = client.db('test');
      const cursor = db.collection('foursquare_restaurant').find(
        // {'venue.name': new RegExp(`.*${req.params.name}`)}
        {'venue.name': `${req.params.name}`}
      ).toArray(function(err, documents) {
          var reg = [];
          documents.forEach(function(x) {
            reg.push({
              'name':x.venue.name,
              'address': x.venue.location.address,
              'location': {
                  'x': x.venue.location.lat,
                  'y': x.venue.location.lng
              },
              'genre': x.venue.categories.name,
              'menu': x.menu
            })
          });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(reg)); 
        client.close();
      });
    }
    });
  });

module.exports = router;
