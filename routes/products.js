var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


// var bodyParser = require('body-parser')
var Product = require('../models/product');
/* GET products listing. */

router.get('/add', function(req, res, next) {
    res.render('add');
  });
router.post('/add', function(req, res, next) {
    var product = new Product(req.body)
    product.save()
    // res.send('product save done')
    .then(() => res.redirect('/products/productList'))
    .catch(next)
  });
router.get('/', function(req, res, next) {
  Product.find({})
  .then(Product =>{res.render('products', {Product : Product})})
  .catch(next)
  });
router.get('/productList', function(req, res, next) {
  Product.find({})
  .then(Product =>{res.render('productList', {Product : Product})})
  .catch(next)
})

router.put('/:id', function(req, res, next) {
   
    Product.updateOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('/products/productList'))
    .catch(next)
    
})
router.delete('/:id', function(req, res, next) {
   
  Product.deleteOne({_id: req.params.id})
  .then(() => res.redirect('back'))
  .catch(next)
  
})  

router.get('/:id/eddit', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id)
    .then(Product =>{res.render('eddit', {Product : Product})})
    .catch(next)
    
}) 

module.exports = router;
