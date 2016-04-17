var express = require('express');
var bodyParser = require('body-parser');

module.exports = (function(){
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Getting all the promotions for you!');
})
.delete(function(req, res, next){
	res.end('Deleting all the promotions!');
})
.post(function(req, res, next){
	res.end('Creating a promotion with ' +req.body.name+'with details: '+req.body.description);
});


promoRouter.route('/:promotionId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending details of promotion with ' +req.params.promotionId+'\n');
})
.put(function(req, res, next){
    res.write('Updating the promotion: ' + req.params.promotionId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting promotion: ' + req.params.promotionId);
});
	return promoRouter;
})();