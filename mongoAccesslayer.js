/**
 * Created by ziv on 23/7/2015.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;

function Mongoaccesslayer(){
    this.url = Object.create(null);
    this.db = Object.create(null);
}


Mongoaccesslayer.prototype.setup = function(url){
    Mongoaccesslayer.url = url;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongoaccesslayer.db = db;
    });
};

Mongoaccesslayer.prototype.insertDocument = function (collectionName,document,callback){
        Mongoaccesslayer.db.collection(collectionName).insertOne(documnet,function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback(result);
        });
};

var mongoaccesslayer= new Mongoaccesslayer();
mongoaccesslayer.setup('mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb');
module.exports=mongoaccesslayer;