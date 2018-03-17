const ChatbotModel = require("../models/chatbotModel.js");
var Model = require('../mongoose_models/chatbotMongooseModel.js');

module.exports = { 
  list : function(req, res) {
	Model.find({}, function (err, entities) { 
	  return res.status(200).json(entities);
	}).sort('_id');
  },   
  details: function(req, res) {
    var id = req.params.id;
    Model.findOne({_id:id}, function (err, entity) {
      if (err) return console.error(err);
      return res.status(200).json(entity);
    });
  },    
  create : function(req, res) {  
  	var body = req.body;
  	var name = body.name;
    var description = body.description;
  	var image = body.image;
    var agent_type = body.agent_type;
    var agent_name = body.agent_name;
    var auth_info = body.auth_info;
  	var chatbotModel = new ChatbotModel(name,description,image,agent_type,agent_name,auth_info);
  	var entity = new Model(chatbotModel);
  	entity.save(function (err, entity) {
  	  if (err) return console.error(err);
  	  res.status(200).json(entity); 
  	});	  	
  },
  update : function(req, res) {
  	var body = req.body; 
  	var _id = req.params.id;
    var name = body.name;
    var description = body.description;
    var image = body.image;
    var agent_type = body.agent_type;
    var agent_name = body.agent_name;
    var auth_info = body.auth_info;
  	var chatbotModel = new ChatbotModel(name,description,image,agent_type,agent_name,auth_info);

  	Model.findByIdAndUpdate(_id,{ $set: chatbotModel}, { new: true },function(err, subject) {
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