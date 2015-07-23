/**
 * Created by ziv on 23/7/2015.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/web'));
var port = process.env.PORT || 3000;
var server = app.listen(port);

documnet =

/*console.log('start');

// Connection URL
var url = 'mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb';

 // Use connect method to connect to the Server

 MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
 console.log("Connected correctly to server");
 db.close();
 });

console.log('end');*/
