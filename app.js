/**
 * Created by ziv on 23/7/2015.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/web'));
var port = process.env.PORT || 3000;
var server = app.listen(port);
