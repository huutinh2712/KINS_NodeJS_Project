var express = require('express'),
    app = express(),
    cron = require('cron'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    request = require('request'),
	cheerio = require('cheerio');

    product = require('./api/models/productModel'), //created model loading here

    category = require('./api/models/categoryModel'), //created model loading here

    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/route'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

var job1 = new cron.CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
    request('https://www.lazada.vn/dong-ho-mat-kinh-trang-suc/?spm=a2o4n.home.0.0.bPCj8J&q=%C4%91%E1%BB%93ng+h%E1%BB%93+c%C6%A1&searchredirect=%C4%91%E1%BB%93ng+h%E1%BB%93+c%C6%A1&sort=popularity&viewType=gridView&fs=1', function(error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var metadata;
        var parsedResults = [];
        $('.c-product-card__description').each(function(i, element) {
            // Select the this element
            var a = $(this);
            // Parse the link title
            var title = a.children().first().text().trim();
            // Parse the link description
            var description = a.children().last().text().replace(/(\r\n|\n|\r)/gm, "").trim();
            // Parse the link price next class
            var price = a.next().children().children().children().first().text().trim();

            // Push meta-data into parsedResults array
            //parsedResults.push(metadata);
            metadata = {
                title: title,
                desciption: description,
                price: price,
            };

            //var json = JSON.stringify(obj)

            // Push meta-data into parsedResults array
            parsedResults.push(metadata);
        });

		//Log our finished parse results in the terminal
    	console.log(parsedResults);
    }
});
  },
  start: false,
  timeZone: 'Asia/Ho_Chi_Minh'
});

job1.start();


