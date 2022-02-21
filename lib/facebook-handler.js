const sequelize = require('../sequelize');
const { user } = sequelize.models;
var crypto = require("crypto");

var generateRandomString = function (len) {
    crypto.randomBytes(len).toString('hex');
}

var generateRandomUsername = function () {
    return generateRandomString(6);
}

var generateRandomPassword = function () {
    return generateRandomString(20);
}

var handleFacebookCallback = async function(accessToken, refreshToken, profile, cb) {
    var existingUser = await user.findOne({ where: { facebookId: profile.id }});
    if(existingUser) { return cb(null, existingUser); }
    
    user.register(generateRandomUsername(), generateRandomPassword(), function (err, registeredUser) {
        if(err) return cb(err);
        registeredUser.update({ facebookId: profile.id });
        cb(err, registeredUser);
    });
}

module.exports = {
    generateRandomPassword: generateRandomPassword,
    generateRandomUsername: generateRandomUsername,
    facebookHandler: handleFacebookCallback
};