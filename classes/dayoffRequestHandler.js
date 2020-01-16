var knex = require('../db/knex')


module.exports = {
    insert: async function (info) {
        return await insertIntoDB(info);
    },

    update: async function (info) {
        return await updateToDB(info);
    },
    updateStatus: async function (info) {
        return await updateStatusToDB(info);
    },

    retreiveByUserId: async function (userId) {
        return await retreiveByUserIdFromDB(userId);
    },

    retreiveAll: async function () {
        return await retreiveAllFromDB();
    },

    retreiveById: async function (id) {
        return await retreiveByIdFromDB(id);
    } 
};
//Status codes:
//EVALUATING
//APPROVED
//DENIED

//function changeStatusCodeToDutch(data) {
//    //console.log(data);
//    for (const info of data) {
        
//        switch (info.status) {
//            case "EVALUATING":
//                info.status = "In afwachting";
//                break;
//            case "DENIED":
//                info.status = "Afgekeurd";
//                break;
//            case "APPROVED":
//                info.status = "Goedgekeurd";
//                break;
//            default:
//                info.status = "Foutieve status code";
//                break;
//        }
//    } 
//    return data 
//}
async function insertIntoDB(info) {
    dateOfToday = new Date()
    return await knex('day_off_requests').insert([
        {
            user_id: info.userId,
            creation_date: dateOfToday,
            from: new Date(info.from),
            till: new Date(info.till),
            reason: info.reason,
            status: 'EVALUATING',
            status_comment: ''
        }]).then(function () {
            return true
        }).catch(function (e) {
            console.log(e)
            return false
        })  
};

async function updateStatusToDB(info) {
    return await knex('day_off_requests ')
        .where({ id: info.id })
        .update({
            status: info.status,
            status_comment: info.status_comment
        })
        .then(function () {
            return true
        })
        .catch(function (e) {
            console.log(e)
            return false
        })  
};
async function updateToDB(info) {
    return await knex('day_off_requests')
        .where({ id: info.id })
        .update({
            creation_date: new Date(info.creation_date),
            from: new Date(info.from),
            till: new Date(info.till),
            reason: info.reason, 
            status: info.status,
            status_comment: info.status_comment
        })
        .then(function () {
            return true
        })
        .catch(function (e) {
            console.log(e)
            return false
        })
};
//select explanation: users.id overides dayoffrequest.id due to both using id. 'dayoffrequest.id as id' writes the initial dayoffrequest id back.
async function retreiveAllFromDB() {
    return await knex.select(['day_off_requests.*', 'users.*', 'day_off_requests.id as id'] )
        .from("day_off_requests") 
        .join('users', { 'user_id': 'users.id' })
        .then(function (data) {  
            return data;
        }).catch(function (e) {
            console.log(e)

            return [];
        }) 
};



async function retreiveByIdFromDB(id) {
    return await knex.select(['day_off_requests.*', 'users.*', 'day_off_requests.id as id'])
        .from("day_off_requests")
        .join('users', { 'user_id': 'users.id' })
        .where("id", id)
        .then(function (data) {
            return data;
        }).catch(function () {
            return [];
        })
};


async function retreiveByUserIdFromDB(userId) {
    return await knex.select(['day_off_requests.*', 'users.*', 'day_off_requests.id as id'])
        .from("day_off_requests")
        .join('users', { 'user_id': 'users.id' })
        .where("user_id", userId)
        .then(function (data) {
            return data;
        }).catch(function () {
            return [];
        })
};


