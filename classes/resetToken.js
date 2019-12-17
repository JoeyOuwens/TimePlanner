var User = require('../models/user');
var Token = require('../models/token');
var emailHandler = require('../classes/emailHandler');

module.exports = {
    generateFor: async function (email) {
        email = email.toLowerCase();
        var userExists = await User.query().where({ email: email.toLowerCase() }).first();
        if (userExists !== undefined) {
            handleTokenGeneration(userExists);
        } else {
            handleAccountDoesntExist(email);
        }

    },

    exists: async function (tokenSerial) {
        var token = await Token.query().where({ token_serial: tokenSerial }).first();
       if (token !== undefined && !token.isTokenExpired()) {
            return true;
        } else {
            return false;
        }             
    },

    passwordReset: async function (tokenSerial, password) {
        const tkn = await Token.query().where({ token_serial: tokenSerial }).first().eager('user');
        tkn.user.changePassword(password);
    }

};

function handleAccountDoesntExist(email) {
    emailHandler.sendNoAccountFoundEmail(email);
}

async function handleTokenGeneration(user) {
    var tokenSerial = Token.generateToken();
    if (await insertTokenIntoDB(tokenSerial, user.id)) {
        emailHandler.sendResetPasswordEmail(user.email, tokenSerial);
    }

    //console.log(await Token.query().select());
    
}

async function insertTokenIntoDB(tokenSerial, userId) {
    date = new Date();
    date.setDate(date.getDate() + 1); 

    return await Token.query().insert({
            user_id: userId,
            token_serial: tokenSerial,
            valid_until: date,
            used: false
    }).then(function () {
        return true;
    }).catch(function (e) {
        console.log(e);
        return false;
    });
}