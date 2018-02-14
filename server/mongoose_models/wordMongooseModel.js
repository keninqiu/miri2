const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const collection = 'Word';
function getModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://keningqiu:98523020@ds117148.mlab.com:17148/miri');
  autoIncrement.initialize(mongoose.connection);
  var schema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },     
    voice: {
      type: String
    },
    image: {
      type: String
    }
  });
  schema.plugin(autoIncrement.plugin, {
    model: collection,
    field: '_id',
    startAt: 1,
    incrementBy: 1
  });  

  if (mongoose.models && mongoose.models.model) return mongoose.models.model
  // if no current model exists register and return new model
  $model = mongoose.model(collection, schema);
  return $model;
}

var model = getModel();
module.exports = model;
