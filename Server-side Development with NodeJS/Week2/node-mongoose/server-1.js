var mongoose = require('mongoose'), 
assert = require('assert'); 
var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("Connected\n");
    var newDish = Dishes({
       name: 'Uthapizza', 
       description: 'Test' 
    });
    newDish.save(function(err) {
        if(err) throw err;
        console.log('Dish created\n');
        
    });
    
    Dishes.find({}, function (err, dishes) {
        if(err) throw err;
        console.log("Found: \n"+dishes);
        db.collection('dishes').drop(function(){
            db.close();
        });
    });
});