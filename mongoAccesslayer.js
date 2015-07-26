/**
 * Created by ziv on 23/7/2015.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')


function MongoAccessLayer() {
    this.url = Object.create(null);
    this.db = Object.create(null);
    this.field = null;
};


MongoAccessLayer.prototype.setup = function (url) {
    MongoAccessLayer.url = url;

};

MongoAccessLayer.prototype.connect2 = function (callback) {
    MongoClient.connect(MongoAccessLayer.url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        MongoAccessLayer.db = db;
        callback(null,db);
    });

};

MongoAccessLayer.prototype.findUser = function (collectionName,value,callback){
    var query = { "email" :value};
    if ((MongoAccessLayer.db == undefined) || (MongoAccessLayer.db == null)) {
        this.connect2(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                MongoAccessLayer.db.collection(collectionName).findOne(query, function (err, result) {
                    assert.equal(err, null);
                    console.log(result);
                    callback(result);
                });
            }
        });
    } else {
        MongoAccessLayer.db.collection(collectionName).findOne(query, function (err, result) {
            assert.equal(err, null);
            console.log(result);
            callback(result);
        });
    }

};

MongoAccessLayer.prototype.insertDocument = function (collectionName, document, callback) {
    if ((MongoAccessLayer.db == undefined) || (MongoAccessLayer.db == null)) {
        this.connect2(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                MongoAccessLayer.db.collection(collectionName).insertOne(document, function (err, result) {
                    assert.equal(err, null);
                    console.log("Inserted a document into the restaurants collection.");
                    callback(data);
                });
            }
        });
    } else {
        MongoAccessLayer.db.collection(collectionName).insertOne(document, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback(result);
        });
    };
};

var mongoAccessLayer = new MongoAccessLayer();
mongoAccessLayer.setup('mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb');
module.exports = mongoAccessLayer;