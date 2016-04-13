var express = require('express');
var bodyParser = require('body-parser');

module.exports = (function(){
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Getting all the dishes for you!');
})
.delete(function(req, res, next){
	res.end('Deleting all the dishes!');
})
.post(function(req, res, next){
	res.end('Creating a dish with ' +req.body.name+'with details: '+req.body.description);
});


dishRouter.route('/:dishId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending details of dish with ' +req.params.dishId+'\n');
})
.put(function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});
	return dishRouter;
})();