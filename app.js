/**
 * Created by ziv on 23/7/2015.
 */
var FB = require('fb');
var express = require('express');
var facebooktodb = require('./facebookTodb.js');
var app = express();

app.use(express.static(__dirname + '/web'));

app.get('/user/:id/:accessToken', function (req, res) {
    console.log('requested url: ', req.url);
    if (req.params.id) {
        var params = {
            access_token: req.params.accessToken,
            fields: ['name', 'first_name', 'last_name', 'email','id']
        };

        FB.napi('/' + req.params.id, params, function (err, response) {
            if (err) {
                res.send('FB.napi - error!!');
            } else {
                facebooktodb.checkUser(response, function (err, data) {
                    if (err) {
                        res.send('check user - error!!');
                    } else if (data) {
                        res.send('Welcome ' + response.name + ',');
                    } else {
                        facebooktodb.insertUser(response, function (err, data) {
                            if (err){
                                res.send('insertUser error!', err);
                            } else {
                                res.send('Welcome ' + data);
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.send('403 - not a valid request!');
    }
});

var port = process.env.PORT || 3000;
var server = app.listen(port);