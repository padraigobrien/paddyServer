var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    experiences        = require('./routes/experiences'),
    bookings = require('./routes/bookings'),
    common = require('./common'),
    app = express();

var config = common.config();
var port = config.PORT;
console.log(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});

app.get('/experiences', experiences.findAll);
app.get('/experiences/:id', experiences.findById);
app.put('/bookings', bookings.createNew);
app.get('/bookings/', bookings.findAll);
app.get('/bookings/:userID', bookings.findById);

app.set('port', port || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
