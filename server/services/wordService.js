var WordMongooseModel = require('../mongoose_models/wordMongooseModel.js');
module.exports = {
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
  		else if((type == 'speak_word') || (type == 'write_word_with_Chinese')) {
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