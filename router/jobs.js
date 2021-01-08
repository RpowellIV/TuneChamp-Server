const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const jobs = require('../models/jobs');
const db = require('../models').Jobs;
const db2 = require('../models').userJobs;
// router.use('/', express.static(__dirname + '../views/pages'));
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
    const jobs = await db.findAll({
        attributes: ['id', 'title', 'companyName', 'description', 'email', 'city', 'state', 'location']
    })
    res.json({
        is: "working",
        jobs
    })
})


router.get("/matchJob/:id", async (req, res) => {

    const matchedId = req.params.id
    console.log(matchedId)

    const jobFind = await db.findAll({
        attributes: ['title', 'companyName', 'description', 'email', 'city', 'state', 'location'],
        // where: "id"=== matchedId
        // })

        // res.send(jobFind)
    }, {
        where: matchedId === 'id',
        include: { model: db2, as: "userJobs" }
    })

    // console.log(jobFind[0])
    // console.log(jobFind.dataValues[0])
    // console.log(jobFind[0])
    // const jobFind = await db.findAll({
    //     include:[
    //         {
    //             model: db2, 
    //             as:'userJobs',
    //             through: {attributes: []}
    //         }],
    //     where:{
    //         id: matchedId   
    //     }
    // })
    // //     const jobFind = await db.findOne( { where: { id: matchedId }, include: [ db2] } )
    //     res.send(jobFind)
    // res.json({
    //     // is: "working", 
    //     jobFind:
    // })
    res.json(jobFind)
})


router.post('/employerjob', async (req, res) => {
    try {
        const {
            jCompany,
            jAbout,
            jUrl,
            jLocation,
            jState,
            jCity,
            jTitle } = req.body;
        await db.create(
            {
                title: jTitle,
                companyName: jCompany,
                description: jAbout,
                email: jUrl,
                location: jLocation,
                city: jCity,
                state: jState,
                numApplied: null,
                whoApplied: null
            }, {}
        )
        res.render("pages/employer")
        // res.redirect('/employer')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
router.post('/', async (req, res) => {
    console.log("Here")
    console.log(req.user.id);
    const {
        addJob,
        outJob,
        jCompany,
        jAbout,
        jUrl,
        jLocation,
        jState,
        jCity,
        jTitle } = req.body;
    console.log(addJob)
    console.log(outJob)
    const Jobs = await db.create(
        {
            title: jTitle,
            companyName: jCompany,
            description: jAbout,
            email: jUrl,
            location: jLocation,
            city: jCity,
            state: jState,
            numApplied: null,
            whoApplied: null
        }, {}
    )
    const userJobs = await db2.create(
        {
            hasBoth: "yes",
            JobId: parseInt(addJob) || Jobs.id,
            UserId: req.user.id
        }, {}
    )

});
module.exports = { router };
