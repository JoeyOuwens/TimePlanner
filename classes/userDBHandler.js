var knex = require('../db/knex')

module.exports = {
    getAllUsers: async function () {
        var users = await knex.select().from("users")
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return users
    },

    getUserById: async function (id) {
        var user = await knex.select()
            .from("users")
            .where("id", id)
            .then(function (data) {
                data[0].birth_date = fixBirthdate(data[0].birth_date);
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserRoleById: async function (id) {
        var user = await knex.select("role")
            .from("users")
            .where("id", id)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserByEmail: async function (email) {
        var user = await knex.select()
            .from("users")
            .where("email", email)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    getUserIdByEmail: async function (email) {
        var user = await knex.select("id")
            .from("users")
            .where("email", email)
            .then(function (data) {
                return data
            }).catch(function () {
                return [];
            })
        return user
    },
    insertUser: async function (accountDetails, password) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return await knex('users').insert([
            {
                password: password,
                firstname: accountDetails.inputFname,
                middlename: accountDetails.inputMname,
                lastname: accountDetails.inputLname,
                email: accountDetails.inputEmail,
                employed_since: String(date),
                birth_date: accountDetails.inputDOB,
                address: accountDetails.inputAddress,
                zip: accountDetails.inputZipcode,
                place: accountDetails.inputPlace,
                contract_hours: accountDetails.inputWorkHours,
                phone_number: accountDetails.inputTelephone,
                function: accountDetails.inputFunction,
                role: accountDetails.inputRights,
                profile_image: '',
                salary: 0.0,
                active: true
            }]).then(function () {
                return true
            }).catch(function () { 
                return false
            })  

    },
    activateUserById: function (userId) {
        return knex('users')
            .where({ id: userId })
            .update({ active: true })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })
    },


    deactivateUserById: function (userId) {
        return knex('users')
            .where({ id: userId })
            .update({ active: false })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })
    },


    updateUser: function (accountDetails) {

        mapValuesToUser(accountDetails)

    },

    updateUserPasswordById: function (userId, password) {
        return knex('users')
            .where({ id: userId })
            .update({ password: password })
            .then(function () {
                return true
            })
            .catch(function (e) {
                console.log(e)
                return false
            })  
    }
};

function fixBirthdate(birthdate) {
    var fixedBirthdate = ''
    birthdate.split('-').forEach(function (element) {
        if (element.length == 1){
            element = '-0' + element
        }
        else if (element.length == 2) {
            element = '-' + element
        } ;
        fixedBirthdate = fixedBirthdate + element 
    });
    
    return fixedBirthdate
};

async function  mapValuesToUser(accountDetails) {
    var user = await getUserById(accountDetails.id);
    user.forEach(function (element) {
        console.log(element)
    });
};

function updateUserById() {

    return knex('users')
        .where({ id: accountDetails.id })
        .update({
            password: accountDetails.password,
            firstname: accountDetails.firstname,
            middlename: accountDetails.middlename,
            lastname: accountDetails.lastname,
            email: accountDetails.email,
            employed_since: accountDetails.employed_since,
            birth_date: accountDetails.birth_date,
            address: accountDetails.address,
            zip: accountDetails.zip,
            place: accountDetails.place,
            contract_hours: accountDetails.contract_hours,
            phone_number: accountDetails.phone_number,
            function: accountDetails.function,
            role: accountDetails.role,
            profile_image: accountDetails.profile_image,
            salary: accountDetails.salary,
            active: accountDetails.active
        })
        .then(function () {
            return true
        })
        .catch(function (e) {
            console.log(e)
            return false
        })  
}