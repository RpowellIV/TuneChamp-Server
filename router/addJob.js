// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');

// const db = require('../models');


// // router.use('/', express.static(__dirname + '../views/pages'));

// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: false }));


// // router.get("/", async (req, res) => {
// //     const jobs = await db.findAll({
// //         attributes: ['id', 'title', 'companyName', 'description', 'email', 'city', 'state', 'location']
// //     })
// //     res.json({
// //         is: "working", 
// //         jobs
// //     })

// // })

// router.post('/', async (req, res) => {

//     console.log("Here")
//     console.log(req.user.id);
    
//     const { outJob } = req.body;

//     console.log(req.body)
//     console.log(outJob)

    
//     const Jobs = await db.Jobs.create(

//             {
//                 title: outJob.title,
//                 companyName: outJob.company,
//                 description: outJob.description,
//                 email: outJob.email,
//                 location: outJob.location
//             },{}
//         )

//     const userJobs = await db.userJobs.create(

//             {
//                 hasBoth: "yes",
//                 JobId: parseInt(outJob),
//                 UserId: req.user.id
//             },{}
//         )
        
//         res.json({
//             is: "working", 
//             userJobs,
//             Jobs
//         })

//     } 
// );

// module.exports = {router};