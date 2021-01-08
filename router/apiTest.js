const express = require('express');
const test = express();
const fetch = require('node-fetch')

// module.exports = (app, fetch) => {
test.get("/", async (req,res) => {
    const { author, title } = req.body;
    const params = `${title ? "title=" + title: ''}${author ? "&author=" + author : ''}`;
        fetch(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=120&t.k=fz6JLNDfgVs&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0`)
            .then(result => result.json())
            .then(data => res.json(data)) 
            .catch(err => console.log(err))
        });
    // }

module.exports = test;