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
    if (MongoAccessLayer.db == null || MongoAccessLayer.db == undefined) {
        MongoClient.connect(MongoAccessLayer.url, function (err, db) {
            assert.equal(null, err);
            MongoAccessLayer.db = db;
            callback(null, db);
        });
    } else {
        callback(null, MongoAccessLayer.db);
    }
};

MongoAccessLayer.prototype.findUser = function (collectionName, value, callback) {
    var query = {"email": value};
    this.connect(function (err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collectionName).findOne(query, function (err, result) {
                console.log('findOne result: ', result);
                assert.equal(err, null);

                if (result != null)
                    db.close();


                callback(null, result);
            });
        }
    })
};

MongoAccessLayer.prototype.insertDocument = function (collectionName, document, callback) {
    this.connect(function (err, db) {
        if (err) {
            callback(err, null);
        } else {
            db.collection(collectionName).insertOne(document, function (err, result) {
                assert.equal(err, null);
                db.close();
                callback(null, result);
            });
        }
    });
};

var mongoAccessLayer = new MongoAccessLayer();
mongoAccessLayer.setup('mongodb://shopper:idc2015@ds053300.mongolab.com:53300/shopperdb');
module.exports = mongoAccessLayer;