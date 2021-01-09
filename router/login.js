const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/logged', (req,res) => {
    var token = req.params;
    res.json({
        is:"working",
        token
    });
    console.log(token)
});

module.exports = app;

