var WordMongooseModel = require('../mongoose_models/wordMongooseModel.js');
const WordModel = require("../models/wordModel.js");
module.exports = {
  saveIfNotExisted: function(text) {
    WordMongooseModel.find({text:text}, function (err, entities) {
      console.log('entities=');
      console.log(entities.length);
      if(!entities || (entities.length == 0)) {
        console.log('begin save');
        var wordModel = new WordModel(text,'','');
        var entity = new WordMongooseModel(wordModel);
        entity.save(function (err, entity) {
          if (err) return console.error(err);
          //res.status(200).json(entity);
        });        
      }
    }); 
  },
  appendAssets:async function(questions) {
    console.log(questions);
  	var words = await WordMongooseModel.find({});
  	for(var i=0;i<questions.length;i++) {
      //console.log('i='+i);
  		var question = questions[i];
  		var type = question.type;
  		var choices = question.choices;

  		if((type == 'recognize_word') || (type == 'fill_blank')) {
  			for(var j=0;j<choices.length;j++) {
  				var choice = choices[j];
  				for(var k=0;k<words.length;k++) {
  					var word = words[k];
  					if(choice.text == word.text) {
              console.log('found it for ' + choice.text);
  						questions[i].choices[j] = word;
              //console.log('choices');
              //console.log(questions[i].choices[j].text);
  						break;
  					}
  				}
  			}
  		}
  		else if((type == 'speak_word') || (type == 'write_word_with_Chinese') || (type == 'listen_only')) {
        questions[i].choices[0] = {text:questions[i].subtitle}; 
  			for(var k=0;k<words.length;k++) {
  				var word = words[k];
  				if(question.subtitle == word.text) {
            questions[i].choices[0] = word;
            break;
  				}
  			} 
   			
  		}    
  	}
    return questions;
  }	
}