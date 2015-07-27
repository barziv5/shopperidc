/**
 * Created by ziv on 23/7/2015.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


function MongoAccessLayer() {
    this.url = Object.create(null);
    this.db = Object.create(null);
};


MongoAccessLayer.prototype.setup = function (url) {
    MongoAccessLayer.url = url;
};

MongoAccessLayer.prototype.connect = function (callback) {
    MongoClient.connect(MongoAccessLayer.url, function (err, db) {
        assert.equal(null, err);
        MongoAccessLayer.db = db;
        callback(null, db);
    });

};

MongoAccessLayer.prototype.findUser = function (collectionName, value, callback) {
    var query = {"email": value};
    if ((MongoAccessLayer.db == undefined) || (MongoAccessLayer.db == null)) {
        this.connect(function (err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection(collectionName).findOne(query, function (err, result) {
                    assert.equal(err, null);
                    callback(null, result);
                });
            }
        });
    } else {
        MongoAccessLayer.db.collection(collectionName).findOne(query, function (err, result) {
            assert.equal(err, null);
            console.log(result);
            callback(null, result);
        });
    }

};

MongoAccessLayer.prototype.insertDocument = function (collectionName, document, callback) {
    if ((MongoAccessLayer.db == undefined) || (MongoAccessLayer.db == null)) {
        this.connect(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                MongoAccessLayer.db.collection(collectionName).insertOne(document, function (err, result) {
                    assert.equal(err, null);
                    callback(null,result);
                });
            }
        });
    } else {
        MongoAccessLayer.db.collection(collectionName).insertOne(document, function (err, result) {
            assert.equal(err, null);
            callback(null, result);
        });
    };
};

var mongoAccessLayer = new MongoAccessLayer();
mongoAccessLayer.setup('mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb');
module.exports = mongoAccessLayer;