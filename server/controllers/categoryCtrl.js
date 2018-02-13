const CategoryModel = require("../models/categoryModel.js");
var Model = require('../mongoose_models/categoryMongooseModel.js');

module.exports = {
  list : function(req, res) {
	Model.find({},'language name image', function (err, entities) {
	  return res.status(200).json(entities);
	});
  },   
  create : function(req, res) {  
  	var body = req.body; 
  	var language = body.language;
  	var name = body.name;
  	var image = body.image;
  	var categoryModel = new CategoryModel(language,name,image);
  	var entity = new Model(categoryModel);
	entity.save(function (err, entity) {
	  if (err) return console.error(err);
	  res.status(200).json(entity);
	});	  	
  },
  update : function(req, res) {
  	var body = req.body; 
  	var _id = req.params.id;
  	var language = body.language;
  	var name = body.name;
  	var image = body.image;
  	var categoryModel = new CategoryModel(language,name,image);
  	console.log(categoryModel);
  	Model.findByIdAndUpdate(_id,{ $set: categoryModel}, { new: true },function(err, subject) {
  	  if (err) console.log(err);
  	  return res.status(200).json(subject);
  	}
  	);  	
  },  
  delete: function(req, res) {
  	var _id = req.params.id;
    Model.findOneAndRemove({ _id: _id }, function(err, subject) {
      return res.status(200).json(subject);
    });   	
  }
}