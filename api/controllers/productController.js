'use strict';


var mongoose = require('mongoose'),
  product = mongoose.model('products');

exports.list_all_products = function(req, res) {
  product.find({}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.create_a_product = function(req, res) {
  var new_product = new product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.read_a_product = function(req, res) {
  product.findById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.update_a_product = function(req, res) {
  product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.delete_a_product = function(req, res) {
  product.remove({
    _id: req.params.productId
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'product successfully deleted' });
  });
};

exports.add_lazadaProduct = function(req, res){
  request('https://www.lazada.vn/dong-ho-mat-kinh-trang-suc/?spm=a2o4n.home.0.0.bPCj8J&q=%C4%91%E1%BB%93ng+h%E1%BB%93+c%C6%A1&searchredirect=%C4%91%E1%BB%93ng+h%E1%BB%93+c%C6%A1&sort=popularity&viewType=gridView&fs=1', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var metadata;
    var parsedResults = [];
    $('.c-product-card__description').each(function(i, element){
      // Select the this element
      var a = $(this);
      // Parse the link title
      var title = a.children().first().text().trim();
      // Parse the link description
      var description = a.children().last().text().replace(/(\r\n|\n|\r)/gm,"").trim();
      // Parse the link price next class
      var price = a.next().children().children().children().first().text().trim();
           
      // Push meta-data into parsedResults array
      //parsedResults.push(metadata);
      metadata = {      
        title: title,
        desciption: description,
        price: price,     
      };
      
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });  
    
    res.json(metadata);
  }
});
};
