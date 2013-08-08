var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var screenshotSchema = new Schema({
    user_id: {type: String, default: 'Anonymous', ref: 'users'},
    postdate: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('screenshots', screenshotSchema);