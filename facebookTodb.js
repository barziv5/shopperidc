/**
 * Created by ziv on 26/7/2015.
 */
var mongoAccessLayer = require('./mongoAccesslayer.js');

function FacebookTodb(){};

FacebookTodb.prototype.checkUser =  function(response) {
    mongoAccessLayer.findUser('users',"barziv4@gmail.com",function(err,data) {
        console.log("find response: " + data);
        if (err != null) {
            console.log("cannot connect to databse");
        }else{
            if (data == undefined){
                var document = {
                    "FirstName": response.first_name,
                    "LastName": response.last_name,
                    "email": response.email
                };
              //  mongoAccessLayer.insertDocument('users',document);
            }
        }
    });
};

var facebookTodb = new FacebookTodb();
module.exports = facebookTodb;