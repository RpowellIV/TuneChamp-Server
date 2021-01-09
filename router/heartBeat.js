module.exports = (app) => {

    app.get('/heartbeat', (req, res) => {
      res.json({
        message: "We have a heartbeat."
      })
    });

  };