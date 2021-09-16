var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var db = require('../lib/productdb')
var finalImg = require('../models/img');
var multer = require('multer');
var fs = require('fs')
var path = require('path');
const mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId;
// server
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
})

var upload = multer({ storage: storage })

router.get('/', function (req, res) {
    res.render('image');
})
router.post('/', upload.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer.from(encode_image, 'base64')
    };
    db.collection('quotes').insertOne(finalImg, (err, result) => {
        res.redirect('/img')

    })
})
//get photo id
router.get('/list', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
  const imgArray= result.map(element => element);
  console.log(imgArray);
   
  if (err) return console.log(err)
    res.render('imgList', {imgArray: imgArray})
  })
});
//get photo
router.get('/list/:id', (req, res) => {
  var filename = req.params.id;
   
  db.collection('quotes').findOne({'_id': ObjectId(filename) }, (err, result) => {
    if (err) return console.log(err)
    
    res.contentType('image/png');
    res.send(result.image.buffer)
  })
})

router.delete('/:id', (req, res) => {
  var filename = req.params.id;
   
  db.collection('quotes').deleteOne({'_id': ObjectId(filename) }, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/img/list')
  })
})


module.exports = router;
