var mongoose = require('mongoose'), 
assert = require('assert'); 
var Leaders = require('./models/leaders');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("Connected\n");
     Leaders.create({
       name: 'Peter Pan', 
       description: 'Test',
       designation: 'Head Chef',
       image: '/images/pizza.png',
       abbr: 'CEO'
     },
       function (err, dish) {
           if(err) throw err;
           console.log('Leader created');
           console.log(dish);
           var id = dish._id;
          
           setTimeout(function(){
               Leaders.findByIdAndUpdate(id, {
                   $set:{
                       description: 'Updated'
                   }
               },
               {
                   new: true    
               }).exec(function(err, dish){
                   if(err) throw err;
                   console.log('Updated Leader: '+dish);
                   
                   db.collection('Leaders').drop(function(){
                   db.close();
             });
            });
           }, 3000);
    });
});
