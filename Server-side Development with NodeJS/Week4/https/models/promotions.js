var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
   name:{
       type: String,
       required: true,
       unique: true
   }, 
   image:{
       type: String
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
},{
   timestamps: true
});


var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions;
