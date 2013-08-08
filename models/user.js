var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var userSchema = new Schema({
    title:  String,
    name: String,
    postdate: {type: Date, default: Date.now},
    screenshot: [{type: Schema.Types.ObjectId, ref: 'screenshots'}]
});
 
module.exports = mongoose.model('users', userSchema);