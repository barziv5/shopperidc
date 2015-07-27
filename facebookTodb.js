/**
 * Created by ziv on 26/7/2015.
 */
var mongoAccessLayer = require('./mongoAccesslayer.js');

function FacebookTodb() {
};

FacebookTodb.prototype.validateUser = function (loginInput, callback) {

    //check user according to email
    mongoAccessLayer.findUser('users', loginInput.user_name, function (err, data) {
        console.log('find response: ' + data);

        if (err)
            callback(err, null);

        if (data && (loginInput.password == data.password)) {
            callback(null, {status: "valid", name: data.FirstName});
        } else {
            //user doesn't exist or password is incorrect
            callback(null, {status: "invalid"});
        }
    });
};

FacebookTodb.prototype.checkUser = function (response, callback) {

    //check user according to email
    mongoAccessLayer.findUser('users', response.email, function (err, data) {
        console.log('find response: ' + data);

        if (err)
            callback(err, null);

        if (data) {

            //user exist
            callback(null, true);
        } else {

            //user doesn't exist
            callback(null, false);
        }
    });
};

FacebookTodb.prototype.insertUser = function (user, callback) {
    if (user == undefined || user == null) {
        callback(new EventException('user can not be null'), null);
    } else {
        var document = {
            "FirstName": user.first_name,
            "LastName": user.last_name,
            "email": user.email,
            "UserId": user.id
        };

        mongoAccessLayer.insertDocument('users', document, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
};

var facebookTodb = new FacebookTodb();
module.exports = facebookTodb;