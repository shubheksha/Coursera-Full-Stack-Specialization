var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var CommentSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    postedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
},{
        timestamps: true
    });
var dishSchema = new Schema({
   name:{
       type: String,
       required: true,
       unique: true
   },
   image:{
       type: String
   },
   category:{
       type: String,
       required: true
   },
   description:{
       type: String,
       required: true
   },
   label:{
       type: String,
       default: ' '
   },
   price:{
       type: Currency,
       required: true
   },
   comments: [CommentSchema]
},{
   timestamps: true
});


var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;
