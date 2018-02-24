const PracticeModel = require("../models/practiceModel.js");
var Model = require('../mongoose_models/practiceMongooseModel.js');
var QuestionModel = require('../mongoose_models/questionMongooseModel.js');
var WordModel = require('../mongoose_models/wordMongooseModel.js');
const WordService = require("../services/wordService.js");

module.exports = {
  list : function(req, res) {
	Model.find({}, function (err, entities) {
	  return res.status(200).json(entities);
	});
  },
  details: async function(req, res) {
    var id = req.params.id;
    var details = {};
    Model
      .findOne({_id:id})
      .exec(function(err, practice) {
        //console.log(practice);
        QuestionModel
          .find({practice_id:id})
          .exec(function(err,questions) {
            //console.log(questions);
            WordService.appendAssets(questions).then(questions => { 
              details.practice = practice;
              details.questions = questions;
              return res.status(200).json(details);
            } );
            
            
          });
      });
    /*
    Model.findOne({_id:id}, function (err, entity) {
      if (err) return console.error(err);
      var details = {};
      details.practice = entity;
      QuestionModel.find({practice_id:id}, function (err, questions) {
        for(var i=0;i<questions.length;i++) {
          var question = questions[i];
          if(question.type == 'recognize_word') {
            for(var j=0;j<question.choices.length;j++) {
              var choice = question.choices[j];
              WordModel.findOne({text:choice.text},function (err, word) {
                choice = word;
                console.log('choice=');
                console.log(choice);
              });              
            }

          }
        }
        console.log('questions=');
        console.log(questions);
        details.questions = questions;

        return res.status(200).json(details);
      });
      
    });
    */
  },
  create : function(req, res) {
  	var body = req.body; 
    var category_id = body.category_id;
    var name = body.name;
  	var description = body.description;
  	var image = body.image;
  	var practiceModel = new PracticeModel(category_id,name,description,image);
  	var entity = new Model(practiceModel);
  	entity.save(function (err, entity) {
  	  if (err) return console.error(err);
  	  res.status(200).json(entity);
  	});	  	
  },
  update : function(req, res) {
  	var body = req.body; 
  	var _id = req.params.id;
  	var category_id = body.category_id;
  	var name = body.name;
    var description = body.description;
  	var image = body.image;
  	var practiceModel = new PracticeModel(category_id,name,description,image);
  	Model.findByIdAndUpdate(_id,{ $set: practiceModel}, { new: true },function(err, subject) {
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