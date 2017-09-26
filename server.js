var express = require('express'),
    app = express(),
    cron = require('cron'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    request = require('request'),
    cheerio = require('cheerio'),
    user = require('./api/models/userModel'), //created model loading here
    product = require('./api/models/productModel'), //created model loading here
    category = require('./api/models/categoryModel'), //created model loading here
    bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');

// mongoose instance connection url connection
mongoose.connect('mongodb://Tododb:123456@ds139884.mlab.com:39884/heroku_j6cj400h');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);


var routes = require('./api/routes/route'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

/*var job1 = new cron.CronJob({
    cronTime: '* * * * * *',
    onTick: function() {
        
        });
    },
    start: false,
    timeZone: 'Asia/Ho_Chi_Minh'
});*/

//job1.start();

var test = require('./api/controllers/productController');
//test.crawl_lazadaProduct();
test.cron_job_lazadaProduct().start();
