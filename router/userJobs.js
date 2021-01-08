const express = require('express');
const router = express.Router();


const db = require('../models').userJobs;



router.get("/", async (req, res) => {
    
    const jobs = await db.findAll({
        attributes: ['JobId'],
        
    }, {
        where: req.user.id === 'UserId'
    })
    res.json({
        is: "working", 
        jobs
    })
})

module.exports = {router};