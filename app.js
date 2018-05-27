const config = require("./config/config.js");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");

const routes = require("./routes/index");
const api = require("./routes/api.js");

const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(favicon(__dirname + "/vv-favicon.ico"));
app.use(logger(process.env.NODE_ENV));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// allow CORS, should disable this in production
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	next();
});

// routes
app.use("/", routes);
app.use("/api/v1", api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
// prevents stack traces from getting to use unless in development mode
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render("error", {
		title: "Error",
		message: err.message,
		error: process.env.NODE_ENV === "development" ? err : {}
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
