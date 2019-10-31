var knex = require('../db/knex')

module.exports = {

    generate: function (email) {

        return "ABCDEFGIAMATESTTOKEN123"
    },

    exists: function (resetToken) {
        return false
             
    }

};


function accountExists(email) {

}