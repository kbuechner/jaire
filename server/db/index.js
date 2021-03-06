'use strict';
var db = require('./_db');


var User = require('./models/user');
var Address = require('./models/address');
var Order = require('./models/order');
var Review = require('./models/review');
var Product = require('./models/product');
var OrderProduct = require('./models/order-products');

//order has one user
Order.belongsTo(User);
Order.belongsToMany(Product, {
  through: OrderProduct
});
Product.belongsToMany(Order, {
  through: OrderProduct
});

Order.hasMany(Address);

// product belongsToMany orders through a specific model with specific data e.g. through OrderProducts/LineItems
// price at time of purchase
// order belongsToMany products

User.hasMany(Address);

//user has many orders
User.hasMany(Order, {
  as: 'orders'
});
User.hasMany(Review);

//product has many reviews
// I took out the as 'reviews' alias because it was redundant. it will be 'reviews' without aliasing.
Product.hasMany(Review);

module.exports = db;
