const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const api = require('./routes/api.js');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(favicon(__dirname + '/public/vv-favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// prevents stack traces from getting to use unless in development mode
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development' ? err : {})
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;