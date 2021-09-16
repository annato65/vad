var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var Tech = require('../models/tech');


/* GET tech listing. */

router.get('/add', function(req, res, next) {
    res.render('tech/add');
  });
router.post('/add', function(req, res, next) {
    var tech = new Tech(req.body)
    tech.save()
    .then(() => res.redirect('/tech'))
    .catch(next)
  });
router.get('/', function(req, res, next) {
  Tech.find({})
  .then(Tech =>{res.render('tech/tech', {Tech : Tech})})
  .catch(next)
  });
router.get('/techList', function(req, res, next) {
  Tech.find({})
  .then(Tech =>{res.render('tech/techList', {Tech : Tech})})
  .catch(next)
})

router.put('/:id', function(req, res, next) {
   
    Tech.updateOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('/tech/techList'))
    .catch(next)
    
})
router.delete('/:id', function(req, res, next) {
   
  Tech.deleteOne({_id: req.params.id})
  .then(() => res.redirect('back'))
  .catch(next)
  
})  

router.get('/:id/eddit', function(req, res, next) {
  Tech.findByIdAndUpdate(req.params.id)
    .then(Tech =>{res.render('tech/eddit', {Tech : Tech})})
    .catch(next)
    
}) 


module.exports = router;
