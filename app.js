/**
 * Created by ziv on 23/7/2015.
 */
var FB = require('fb');
var express = require('express');
var mongoAccessLayer = require('./mongoAccesslayer.js');
var app = express();

app.use(express.static(__dirname + '/web'));

app.get('/user/:id/:accessToken', function (req, res) {
    if (req.params.id) {
        var params = {
            fields: ['name', 'first_name', 'last_name', 'email'],
            accessToken: req.params.accessToken
        };

        FB.napi('/' + req.params.id, params, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log(response);
            }
        });
    } else {
        console.log('not a valid request!');
        res.send('403 - not a valid request!');
    }
});
var port = process.env.PORT || 3000;
var server = app.listen(port);

/*
 var document = {
 "FirstName": "test4",
 "LastName": "test4",
 "email": "test4@gmail.com",
 "UserName": "test4",
 "Password": "1232",
 "UserId": "12345678902",
 "Hobbies": [
 "Sport",
 "tech"
 ]
 };

 mongoAccesslayer.insertDocument('users',document,function(err,data){
 if (err == null){
 console.log(data);
 }

 });

 console.log('start');

 // Connection URL
 var url = 'mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb';

 // Use connect method to connect to the Server

 MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
 console.log("Connected correctly to server");
 db.close();
 });

 console.log('end');*/
