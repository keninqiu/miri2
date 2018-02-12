const QuestionModel = require("../models/questionModel.js");
var Model = require('../mongoose_models/questionMongooseModel.js');

module.exports = {
  list : function(req, res) {
	Model.find({},'topic voice image choice answer', function (err, entities) {
	  return res.status(200).json(entities);
	});
  },
  create : function(req, res) {
  	var body = req.body; 
    var practice_id = body.practice_id;
    var type = body.type;
  	var topic = body.topic;
    var text = body.text;
  	var voice = body.voice;
  	var image = body.image;
    var choices = body.choices;
    var answer = body.answer;
  	var questionModel = new QuestionModel(practice_id,type,topic,text,voice,image,choices,answer);
  	var entity = new Model(questionModel);
  	entity.save(function (err, entity) {
  	  if (err) return console.error(err);
  	  res.status(200).json(entity);
  	});	  	
  },
  update : function(req, res) {
  	var body = req.body; 
  	var _id = req.params.id;
    var practice_id = body.practice_id;
    var type = body.type;
    var topic = body.topic;
    var text = body.text;
    var voice = body.voice;
    var image = body.image;
    var choices = body.choices;
    var answer = body.answer;
  	var questionModel = new QuestionModel(practice_id,type,topic,text,voice,image,choices,answer);
  	Model.findByIdAndUpdate(_id,{ $set: questionModel}, { new: true },function(err, subject) {
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