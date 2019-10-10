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
    }
};


function getSettings() {
    let rawdata = fs.readFileSync('./settings/mailing.json');
    return JSON.parse(rawdata);
};