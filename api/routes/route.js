'use strict';
module.exports = function(app) {

  var todoList = require('../controllers/productController');

  // todoList Routes
  app.route('/product')
    .get(todoList.list_all_products)
    .post(todoList.create_a_product);


  app.route('/product/:productId')
    .get(todoList.read_a_product)
    .put(todoList.update_a_product)
    .delete(todoList.delete_a_product);

  var todoList = require('../controllers/categoryController');

  // todoList Routes
  
  app.route('/categories/:categoryId')
    .get(todoList.read_a_category)
    .put(todoList.update_a_category)
    .delete(todoList.delete_a_category);

  
    app.route('/categories')
    .get(todoList.list_all_categories)
    .post(todoList.create_a_category);


 // todoList Routes
  var todoList = require('../controllers/userController');


  // todoList Routes
  app.route('/users') 
    .get(todoList.list_all_users)
    .post(todoList.create_a_user);

  app.route('/users/:userId')
    .get(todoList.read_a_user)
    .put(todoList.update_a_user)
    .delete(todoList.delete_a_user);


  

};