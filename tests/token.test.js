var resetTokenHandler = require('../classes/resetToken');
var User = require('../models/user');
var Token = require('../models/token');

describe('Tests for the token model and validation', () => {
    it('Generate a new token for the first user', async () => {
        expect(await resetTokenHandler.exists(await Token.query().select())).toBeFalsy();


        await resetTokenHandler.generateFor((await User.query().first()).email);

        await expect(await resetTokenHandler.exists((await Token.query().first()).id)).toBe(false);
        await expect(await resetTokenHandler.exists((await Token.query().first()).token_serial)).toBe(true);
    });

    it('Check if expired tokens do not get found', async () => {
        date = new Date();
        date.setDate(date.getDate() - 2);

        const token = Token.generateToken();
        await Token.query().insert({
            user_id: (await User.query().first()).id,
            token_serial: Token.generateToken(),
            valid_until: date,
            used: false
        });

        await expect(await resetTokenHandler.exists(token)).toBe(false);
    });

    it('Check if the created token is connected to the user "Elon Musk"', async () => {
        await expect((await Token.query().first().eager('user')).user.getFullName()).toBe("Elon Musk");
    });

});