var nodeMailer = require('nodemailer');
const fs = require('fs'); 
var mailSettings = getSettings();
var transporter = nodeMailer.createTransport(mailSettings.transporter);


module.exports = { 
    sendNewAccountEmail: function (email, name, password) {
        var emailText = `<h2>Beste ${name}, </h2> <p>Je TimePlanner account is aangemaakt. Je kan inloggen met: <p>${email} <p>${password}`
        var mailOptions = {
            from: `"${mailSettings.general.senderName}" <${mailSettings.transporter.auth.user}>`,
            to: email,
            subject: 'Account aangemaakt voor TimePlanner!',
            html: emailText
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },


        sendResetPasswordEmail: function (email, resetToken) {
            var emailText = `<h2>Beste, </h2> <p>Je kan je wachtwoord resetten met de volgende link.<p> <a href="http://localhost:1337/user/resetpassword/token/${resetToken}">Reset wachtwoord.</a> <p> Als je niet je wachtwoord opnieuw hebt aangevraagd kan je deze email negeren. <p> Mocht je problemen hebben met je de link openen, kopieer het volgende in je browser: http://localhost:1337/user/resetpassword/token/${resetToken} `
        var mailOptions = {
            from: `"${mailSettings.general.senderName}" <${mailSettings.transporter.auth.user}>`,
            to: email,
            subject: 'TimePlanner wachtwoord aanvraag!',
            html: emailText
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
        sendNoAccountFoundEmail: function (email) {
        var emailText = `<h2>Beste, </h2> <p>Er is geen account gevonden met dit email address.`
        var mailOptions = {
            from: `"${mailSettings.general.senderName}" <${mailSettings.transporter.auth.user}>`,
            to: email,
            subject: 'Timeplanner wachtwoord aanvraag!',
            html: emailText
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};

function consoleLog(transporter) {

}


function getSettings() {
    let rawdata = fs.readFileSync('./settings/mailing.json');
    return JSON.parse(rawdata);
};