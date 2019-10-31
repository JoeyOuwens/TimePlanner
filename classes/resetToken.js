var crypto = require("crypto");
var userDBHandler = require('../classes/userDBHandler')
var resetTokenDBHandler = require('../classes/resetTokenDBHandler')
var emailHandler = require('../classes/emailHandler')
module.exports = {

    generateFor: async function (email) {
        if (await accountExists(email)) {
            handleTokenGeneration(email);
        } else {
            handleAccountDoesntExist(email)
        }

    },

    exists: async function (tokenSerial) {
        return await tokenExists(tokenSerial)
             
    },

    passwordReset: async function (tokenSerial, password) {
        await handlePasswordReset(tokenSerial, password)
        console.log(await userDBHandler.getAllUsers())
    }

};


async function tokenExists(tokenSerial) {
    var token = await resetTokenDBHandler.getTokenByTokenSerial(tokenSerial);
    if (isValidToken(token)) {
        return true
    } else {
        return false
    }
}


 function isValidToken(token) { 
    if (token.length == 1 && token[0].used == false) {
        return true
    } else {
        return false
    }
}

async function handlePasswordReset(tokenSerial, password) {
    if (await tokenExists(tokenSerial)) {
        var userId = await getUserIdFromToken(tokenSerial)
        useToken(tokenSerial)
        return userDBHandler.updateUserPasswordById(userId,password)
    }
}

async function getUserIdFromToken(tokenSerial) {
    var user = await resetTokenDBHandler.getUserIdByTokenSerial(tokenSerial)
    return user[0].userId
}

function useToken(tokenSerial) {
    resetTokenDBHandler.useToken(tokenSerial);
}

function handleAccountDoesntExist(email) {
    emailHandler.sendNoAccountFoundEmail(email)
}

async function handleTokenGeneration(email) {
    var tokenSerial = generateTokenSerial();
    var user = await userDBHandler.getUserIdByEmail(email)
    if (user != []) {
        var userId = user[0].id
        if (await insertTokenIntoDB(tokenSerial, userId)) {
            emailHandler.sendResetPasswordEmail(email, tokenSerial)
        }
        resetTokenDBHandler.consoleLogTokens();
    }
}


function generateTokenSerial() {
    return crypto.randomBytes(15).toString('hex');

}

async function insertTokenIntoDB(tokenSerial, userId) {
  return await resetTokenDBHandler.insertToken(tokenSerial, userId);
}


 

async function accountExists(email) {
    var user = await userDBHandler.getUserByEmail(email);
    if (user.length == 1) {
        return true
    } else {
        return false
    }

}