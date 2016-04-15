var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
   name:{
       type: String,
       required: true,
       unique: true
   }, 
   description:{
       type: String, 
       required: true
   }
},{
   timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;