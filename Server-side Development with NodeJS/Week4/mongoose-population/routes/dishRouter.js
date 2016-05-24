var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Verify = require('./verify');
module.exports = (function(){
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.find({})
		.populate('comments.postedBy')
		.exec(function(err, dishes) {
		if(err) throw err;
		res.json(dishes);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.remove({}, function(err, dishes){
		if(err) throw err;
		res.json(dishes);
	});
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.create(req.body, function(err, dish){
		if(err) throw err;
		var id = dish._id;
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end('Added dish with id: '+id);
	});
});


dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dishes) {
		if(err) throw err;
		res.json(dish);
	});
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})


.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Dishes.findByIdAndRemove(req.params.dishId, function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
});

dishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dishes) {
		if(err) throw err;
		res.json(dish.comments);
	});
	
})
.post(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		req.body.postedBy = req.decoded._doc._id;
		dish.comments.push(req.body);
		dish.save(function(err, dish){
			if(err) throw err;
			console.log('Comment added\n');
			res.json(dish);
		});
	});
	
})
.delete(Verify.verifyAdmin, function(req, res, next){
	Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});


dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dishes) {
		if(err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
	
})
.put(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		dish.comments.id(req.params.commentId).remove();
		req.body.postedBy = req.decoded._doc._id;
		dish.comments.push(req.body);
		dish.save(function(err, dish){
			if(err) throw err;
			console.log('Updated comment!');
			res.json(dish);
		});
	});
	
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		if(dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id){
			err = new Error("You're not authorized to perform this operation!");
			err.status = 403;
			return next(err);
		}
		dish.comments.id(req.params.commentId).remove();
		dish.save(function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	});
	
});


	return dishRouter;
})();