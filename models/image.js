var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var imageSchema = new Schema({
    ss_id: {type: String, ref: 'screenshots'},
    filename: String,
    postdate: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('images', imageSchema);