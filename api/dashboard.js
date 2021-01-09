module.exports = (app, ensureAuthenticated) => {

    app.get('/dashboard', ensureAuthenticated, (req, res) => {
        res.json ({
            message: 'Hello World'
        })
    });

}
