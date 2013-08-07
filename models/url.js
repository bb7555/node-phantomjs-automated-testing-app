var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var urlSchema = new Schema({
    path:  String,
    host: String,
    postdate: {type: Date, default: Date.now},
});
 
module.exports = mongoose.model('urls', urlSchema);