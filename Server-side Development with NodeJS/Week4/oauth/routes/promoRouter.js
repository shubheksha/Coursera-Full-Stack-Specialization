var express = require('express');
var bodyParser = require('body-parser');
var Promotions = require('../models/promotions');
var Verify = require('./verify');

module.exports = (function(){
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Promotions.find({}, function(err, promotions){
		if(err) throw err;
		res.json(promotions);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
Promotions.remove({},  function(err, promotions){
		if(err) throw err;
		res.json(promotions);
	});
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Promotions.create(req.body,  function(err, promotion){
		if(err) throw err;
		var id = promotion._id;
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Added promotion with id: '+id);
	});
});


promoRouter.route('/:promotionId')

.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Promotions.findById(req.params.promotionId, function(err, promotion){
		if(err) throw err;
		res.json(promotion);
	});
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Promotions.findByIdAndUpdate(req.params.promotionId,{
		$set: req.body
	}, {
		new: true
	}, function(err, promotion){
		if(err) throw err;
		res.json(promotion);
	});
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Promotions.findByIdAndRemove(req.params.promotionId, function(err, promotion){
		if(err) throw err;
		res.json(promotion);
	});
});
	return promoRouter;
})();