var mongoose = require('mongoose'), 
assert = require('assert'); 
var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("Connected\n");
     Promotions.create({
       name: 'Uthapizza', 
       description: 'Test',
       category: 'main',
       image: '/images/pizza.png',
       price: '$4.00',
       label: 'Hot'
     },
       function (err, dish) {
           if(err) throw err;
           console.log('Promotion created');
           console.log(dish);
           var id = dish._id;
          
           setTimeout(function(){
               Promotions.findByIdAndUpdate(id, {
                   $set:{
                       description: 'Updated'
                   }
               },
               {
                   new: true    
               }).exec(function(err, dish){
                   if(err) throw err;
                   console.log('Updated promotion: '+dish);
                   
                   db.collection('promotions').drop(function(){
                   db.close();
             });
            });
           }, 3000);
    });
});
