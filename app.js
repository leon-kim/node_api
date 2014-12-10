var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// model ---------------------------------------
var User = require('./models/user');

// ROUTER --------------------------------------
var router = express.Router();

router.use(function(req, res, next){
  console.log('happening');
  next();
});

router.route('/users')
  .post(function(req, res){
    var user = new User();
    user.name = req.body.name;

    user.save(function(err){
      if(err) res.send(err);
    });
    res.json({message:'user created succesfully.'});
  });


  


app.use('/api', router);




app.listen(port);
console.log('running on ' + port);