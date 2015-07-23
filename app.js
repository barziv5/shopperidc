/**
 * Created by ziv on 23/7/2015.
 */
var express = require('express');
var mongoaccesslayer = require('./mongoAccesslayer.js');
var app = express();

app.use(express.static(__dirname + '/web'));
var port = process.env.PORT || 3000;
var server = app.listen(port);

var documnet = {
    "FirstName": "test3",
    "LastName": "test3",
    "email": "test3@gmail.com",
    "UserName": "test3",
    "Password": "1232",
    "UserId": "12345678902",
    "Hobbies": [
        "Sport",
        "tech"
    ]
}

function insert(collectionName,document){
    mongoaccesslayer.insertDocument('users',document,function(err,data){
        console.log(err);
    })
}

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
