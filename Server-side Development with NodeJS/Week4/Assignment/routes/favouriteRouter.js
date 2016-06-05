var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favourites = require('../models/favourites');
var Verify = require('./verify');
module.exports = (function(){
var favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Favourites.find({postedBy: req.decoded._doc._id})
		.populate('postedBy')
        .populate('dishes')
		.exec(function(err, favourites) {
		if(err) throw err;
		res.json(favourites);
	});
})
.delete(function(req, res, next){
	Favourites.findOneAndRemove({postedBy: req.decoded._doc._id}, function(err, favourites){
		if(err) throw err;
		res.json(favourites);
	});
})
.post(function(req, res, next){
    Favourites.findOneAndUpdate({postedBy: req.decoded._doc._id},
		{
        $addToSet: { //this ensures that no duplicates are added 
          dishes: req.body
        }
      }, {
        upsert: true, //update or insert accordingly
        new: true //takes care of creation
      }, function (err, favorite) {
        if (err) throw err;

        res.json(favorite);
      });

        
});


favouriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Favourites.findOneAndUpdate({postedBy: req.decoded._doc._id}, 
       {
        $pull:{
			dishes: req.params.dishId
			}
        },
        {
			new: true
        },
        function(err, favs){
			if(err) throw err;
			res.json(favs);
		});
});

	return favouriteRouter;
})();
