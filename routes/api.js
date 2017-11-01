var express = require('express'),
    api     = express.Router();

api.post("/send", function(req, res) {
   res.send("a POST request? Nice.");
});

api.get("/list", function(req, res) {
   res.send("a GET request, eh?")
});

module.exports = api;