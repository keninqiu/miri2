const WordModel = require("../models/wordModel.js");
var Model = require('../mongoose_models/wordMongooseModel.js');

module.exports = {
  list : function(req, res) {
	Model.find({}, function (err, entities) {
	  return res.status(200).json(entities);
	});
  },   
  create : function(req, res) {  
  	var body = req.body; 
  	var text = body.text;
  	var voice = body.voice;
  	var image = body.image;
  	var wordModel = new WordModel(text,voice,image);
  	var entity = new Model(wordModel);
	entity.save(function (err, entity) {
	  if (err) return console.error(err);
	  res.status(200).json(entity);
	});	  	
  },
  update : function(req, res) {
  	var body = req.body; 
  	var _id = req.params.id;
  	var text = body.text;
  	var voice = body.voice;
  	var image = body.image;
  	var wordModel = new WordModel(text,voice,image);
  	Model.findByIdAndUpdate(_id,{ $set: wordModel}, { new: true },function(err, word) {
  	  if (err) console.log(err);
  	  return res.status(200).json(word);
  	}
  	);  	
  },  
  delete: function(req, res) {
  	var _id = req.params.id;
    Model.findOneAndRemove({ _id: _id }, function(err, word) {
      return res.status(200).json(word);
    });   	
  }
}