const express = require("express");
const passport = require("../config/passport");

const router = express.Router();

const ejs = require("ejs");

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

router.get("/", (req, res) => {
    res.render("pages/index");
});


// Renders the dashboard for the employer
router.get("/employer", ensureAuthenticated, (req, res) => {
    res.render("pages/employer");
});

// Renders the dashboard for the employee
router.get("/employee", ensureAuthenticated, (req, res) => {
    res.render("pages/employee");
});

// Renders the dashboard for the employee/employer
router.get("/home", ensureAuthenticated, (req, res) => {
    res.render("pages/home");
});


module.exports = router;
