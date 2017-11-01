var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONN);
var api = require('./routes/api.js');

sequelize
    .authenticate()
    .then(function() {
    console.log('Connection has been established successfully.');
})
.catch(function(err) {
    console.error('Unable to connect to the database:', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', api);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', function (req, res) {
    var userAgent = req.headers["user-agent"] || "none";
    if (req.accepts("html")) {
        res.render("index", { userAgent: userAgent });
    } else {
        res.type("text");
        res.send(userAgent);
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;