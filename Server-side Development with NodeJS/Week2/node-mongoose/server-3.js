var mongoose = require('mongoose'), 
assert = require('assert'); 
var Dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("Connected\n");
     Dishes.create({
       name: 'Uthapizza', 
       description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
     },
       function (err, dish) {
           if(err) throw err;
           console.log('Dish created');
           console.log(dish);
           var id = dish._id;
          
           setTimeout(function(){
               Dishes.findByIdAndUpdate(id, {
                   $set:{
                       description: 'Updated'
                   }
               },
               {
                   new: true    
               }).exec(function(err, dish){
                   if(err) throw err;
                   console.log('Updated dish: '+dish);
                   
                   dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);
                   
                   db.collection('dishes').drop(function(){
                   db.close();
               });
             });
            });
           }, 3000);
    });
});
