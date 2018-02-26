var WordMongooseModel = require('../mongoose_models/wordMongooseModel.js');
module.exports = {
  appendAssets:async function(questions) {

  	var words = await WordMongooseModel.find({});
  	for(var i=0;i<questions.length;i++) {
  		var question = questions[i];
  		var type = question.type;
  		var choices = question.choices;
  		if(type == 'recognize_word') {
  			for(var j=0;j<choices.length;j++) {
  				var choice = choices[j];
  				for(var k=0;k<words.length;k++) {
  					var word = words[k];
  					if(choice.text == word.text) {
  						questions[i].choices[j] = word;

  						break;
  					}
  				}
  			}
  		}
  		else if(type == 'speak_word' || type == 'write_word_with_Chinese') {
  			for(var k=0;k<words.length;k++) {
  				var word = words[k];
  				if(question.subtitle == word.text) {
  					questions[i].subtitle = word;
  				}
  				else {
  					questions[i].subtitle = {text:questions[i].subtitle};
  				}
  			}  			
  		}
  	}
    return questions;
  }	
}