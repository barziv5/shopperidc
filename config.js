
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '421262201393188',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'aadbb381266068cee2d9489336062032',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'nodeshopper',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;
