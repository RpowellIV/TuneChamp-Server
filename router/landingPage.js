const express = require('express');
const bodyParser = require('body-parser');
const pgp = require("pg-promise")();
const router = express();
const db = require('../models');

// router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

// Homepage
router.get("/",ensureAuthenticated, (req, res) => {
    res.render("pages/landingPage");
})

router.post('/', async (req, res) => {

    console.log("Here")
    console.log(req.user.id);
    
    const {isEmployer, bio, companyName } = req.body;

    console.log(req.body)
    console.log(isEmployer,bio,companyName)

    if(isEmployer==='false') {
        const user = await db.Users.update(

            {
                isEmployer: false,
                bio: bio,
                companyName: null
            },
    
            { 
                where: {
                        id: req.user.id 
                    }, 
            }
        )

        res.render('pages/employee')

    } else {
        const user = await db.Users.update(

            {
                isEmployer: true,
                bio: bio,
                companyName: companyName
            },
    
            { 
                where: {
                        id: req.user.id 
                    }, 
            }
        )

        res.render('pages/employer')
    }
});


module.exports = router;