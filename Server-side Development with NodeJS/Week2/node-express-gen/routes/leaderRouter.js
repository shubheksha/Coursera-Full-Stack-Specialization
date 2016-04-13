var express = require('express');
var bodyParser = require('body-parser');

module.exports = (function(){
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Getting all the leaders for you!');
})
.delete(function(req, res, next){
	res.end('Deleting all the leaders!');
})
.post(function(req, res, next){
	res.end('Creating a leader with ' +req.body.name+'with details: '+req.body.description);
});


leaderRouter.route('/:leaderId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Sending details of leader with ' +req.params.leaderId+'\n');
})
.put(function(req, res, next){
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.leaderId);
});
	return leaderRouter;
})();