// const express = require('express');
// const passport = require('../config/passport');
// const router = express.Router()

// const ejs = require('ejs');

// //auth with google
// // GET /auth/google
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google auth callback
// // GET /auth/google/callback
// router.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('/landingPage');
//     });

// router.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/')
// })

// module.exports = router