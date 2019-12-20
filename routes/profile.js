'use strict';
var express = require('express');
var validation = require('../classes/validation');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var $ = require('jquery');


const multer = require('multer');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('profile', { title: 'Profiel Overzicht', page: 'overview' });
});

router.get('/changesettings/', function (req, res, next) {
    res.render('profile', { title: 'Profiel wijzigen', page: 'changesettings' });

});

router.post('/changesettings/', async function (req, res, next) {
    let error; // the error can be false or a string
    let saved = false;
    let accountDetails = req.body;
    let id = req.body.userid;

    delete accountDetails.userid; // deletes value from accountDetails and req.body
    delete accountDetails.submit; // deletes value from accountDetails and req.body 

    /* data should be validated before putting into the database */
    var failedFields = fieldValidation(accountDetails);
    if (failedFields.length === 0) {
        await User.query().patchAndFetchById(id, accountDetails).skipUndefined();
        let user = await User.query().where('id', id).first();
        // Hotfix for default image disapearing when updating.
        if (user.profile_image == "") {
            user.profile_image = "images/default_profileimage.jpg";
        }
        req.session.user = user;
        res.locals.userInfo = user;
        
        saved = true;
   }
    
    res.render('profile', { title: 'Profiel wijzigen', page: 'changesettings', failedFields: failedFields, saved: saved });
});

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: async function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload Function with Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 10*1000*1000 },
    fileFilter: async function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('ProfileImage');
 
// Check File Type
async function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Alleen foto bestanden!');
    }
}

//Post function
router.post('/upload', function (req, res) { 
   upload(req, res, (err) => {
       if (err) {
           if (err == "MulterError: File too large") { err = "Foto is te groot! Max 10 MB."} 
           res.render('profile', {
                title: 'Profiel wijzigen',
                page: 'changesettings',
                error: err    
            });
        } else {
            if (req.file == undefined) {
                res.render('profile', {
                    title: 'Profiel wijzigen',
                    page: 'changesettings',
                    error: 'Geen foto geselecteerd.'
                });
            } else {
                User.query().findById(req.session.user.id).patch({ profile_image: `uploads/${req.file.filename}` }).then(function () {
                    if (!((req.session.user.profile_image == "") || (req.session.user.profile_image == "images/default_profileimage.jpg")) ) { 
                        fs.unlink(`public/${req.session.user.profile_image}`, function (err) {
                            if (err) throw err; 
                            console.log('File deleted!');
                        }); 

                        req.session.user.profile_image = `uploads/${req.file.filename}`
                        res.locals.userInfo.profile_image = `uploads/${req.file.filename}`
                        res.redirect('/profile/changesettings');

                    }
                }).catch(function (e) {
                    console.log(e)
                    res.render('profile', {
                        title: 'Profiel wijzigen',
                        error: 'Er ging wat fout,probeer later opnieuw.',
                        page: 'changesettings'
                    });
                });
            }
        }
    });
});

router.get('/tasks/', function (req, res, next) {
    res.render('profile', { title: 'Rooster gegevens',  page: 'tasks' });

});

router.get('/help/', function (req, res, next) {
    res.render('profile', { title: 'Help', page: 'help' });
});
 


router.get('/upload', function (req, res, next) {
    res.redirect('/profile/changesettings');

});

function fieldValidation(details) {
    var failed = [];
    if (details.userid !== undefined) {
        failed.push("'userid'");
    }
    if (!validation.zipcode(details.zip)) {
        failed.push("'zip'");
    }
    if (!validation.telephone(details.phone_number)) {
        failed.push("'phone_number'");
    }
    if (!validation.email(details.email)) {
        failed.push("'email'");
    }
    if (!validation.place(details.place)) {
        failed.push("'place'");
    }
    if (!validation.address(details.address)) {
        failed.push("'address'");
    }
    if (!validation.firstName(details.firstname)) {
        failed.push("'firstname'");
    }
    if (!validation.lastName(details.lastname)) {
        failed.push("'lastname'");
    }
    return failed;
}

module.exports = router;
