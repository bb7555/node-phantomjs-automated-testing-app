var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var userSchema = new Schema({
    title:  String,
    name: String,
    postdate: {type: Date, default: Date.now},
});
 
module.exports = mongoose.model('users', userSchema);