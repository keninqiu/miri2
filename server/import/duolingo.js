var skillId = '09696634a9d5dfb76356c0be973d4c06';
var lessonIndex = 5;
var practice_id = 240 + lessonIndex;
var request = require('request');
var url = "https://www.duolingo.com/2017-06-30/sessions";

var requestData = {"fromLanguage":"zh","learningLanguage":"en","challengeTypes":["characterIntro","characterMatch","characterSelect","form","judge","listen","name","listenComprehension","readComprehension","select","selectPronunciation","speak","translate"],"lessonIndex":lessonIndex,"skillId":skillId,"type":"LESSON"};
request({
    url: url,
    method: "POST",
    json: requestData,
    headers: {
    	'Accept': 'application/json',
    	'Accept-Encoding': 'gzip, deflate, sdch, br',
    	'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
    	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjAxMTk5OTYsInN1YiI6MjE2NTk4OTU2LCJleHAiOjE1NTE2NTU5OTZ9.I5IKIwr0RbDXlMxpM1nKNGHVPhD2X-pBI7-mZafy0BQ',
    	'Connection': 'keep-alive',
    	'Content-Type':'application/json; charset=UTF-8',
    	'Cookie': 'lang=en; logged_out_uuid=743793a3-8fca-4882-ad23-02aaf9531d94; wuuid=245d750a-7d44-49aa-a06d-301d21555e21; __utma=226518408.121014814.1520120064.1520120064.1520120064.1; __utmc=226518408; __utmz=226518408.1520120064.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); auth_tkt="f7746d749b0977731f832103b68657835a9b30bc216598956!userid_type:int"; __qca=P0-1119153843-1520120085441; AWSELB=91E12D7D1E1B37CA82C3043817CF6AE0B5D25E6E40A7CD224194C2ECF0545CB42CF962B1D0595895A66D89C3AF217FC8E8A43365ABA40640229149D9E2FB8A97533D0F96CD; jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjAxMTk5OTYsInN1YiI6MjE2NTk4OTU2LCJleHAiOjE1NTE2NTU5OTZ9.I5IKIwr0RbDXlMxpM1nKNGHVPhD2X-pBI7-mZafy0BQ; mp_mixpanel__c=0',
    	'Host': 'www.duolingo.com',
    	'Origin': 'https://www.duolingo.com',
    	'Referer': 'https://www.duolingo.com/skill/en/Verbs%3A-Past-1/3',
    	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
	}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if ((res.statusCode !== 200) && (res.statusCode !== 201)) {
      console.log('Status:', res.statusCode);

    } else {
      // data is already parsed as JSON:
      console.log(data);   

		const QuestionModel = require("../models/questionModel.js");
		var Model = require('../mongoose_models/questionMongooseModel.js');
		var wordService = require('../services/wordService.js');
		//var wordModel = new WordModel(textModel.text,'','');


		var DataSource = data;
		var challenges = DataSource.challenges;

		Model.remove({ practice_id: practice_id }, function(err, subject) {
		for(var i=0;i<challenges.length;i++) {
			var challenge = challenges[i];
			//console.log(challenge);
			var type = challenge.type;
			var sourceLanguage = challenge.sourceLanguage;
			var prompt = challenge.prompt;
			var compactTranslations = challenge.compactTranslations;
			var correctSolutions = challenge.correctSolutions;
			if(correctSolutions) {
				//console.log('correctSolutions.length=' + correctSolutions.length);
				correctSolutions = correctSolutions[0];
			}
			

			if(compactTranslations) {
				//console.log('compactTranslations.length=' + compactTranslations.length);
				var compactTranslationsString = '';
				for(var k=0;k<compactTranslations.length;k++) {
					compactTranslationsString = compactTranslationsString + compactTranslations[k] + ';';
				}

				compactTranslations = compactTranslationsString;
				compactTranslations = compactTranslations.replace(/;$/g, "");
				if(correctSolutions) {
					var pattern = new RegExp(correctSolutions);
					if(!pattern.test(compactTranslations)) {
						compactTranslations = correctSolutions + ';' + compactTranslations;
					}
					
				}		
				compactTranslations = compactTranslations.replace(/\[/g,'(');
				compactTranslations = compactTranslations.replace(/\]/g,')');
				compactTranslations = compactTranslations.replace(/\//g,'|');
			}
			//console.log('compactTranslations=' + challenge.compactTranslations);
			//console.log('translation=' + challenge.translation);
			
			
			var subtitle = prompt;
			var answer = compactTranslations;

			var choices =  [
		        {
		            "text": ""
		        },
		        {
		            "text": ""
		        },
		        {
		            "text": ""
		        },
		        {
		            "text": ""
		        }
		    ];
			var title = '';
			if(type == 'translate') {
				if(sourceLanguage == 'en') {
					type = 'write_word_with_Chinese';
					title = '用中文书写这个';
					wordService.saveIfNotExisted(subtitle);
				}
				else {
					type = 'write_word_with_English';
					title = '用英文书写这个';
				}
			}
			else if(type == 'speak') {
				type = 'speak_word';
				title = '单击麦克风并说出';
				wordService.saveIfNotExisted(subtitle);
				answer = subtitle;
			}
			else if(type == 'listen') {
				type = 'listen_only';
				title = '键入你听到的内容';
				wordService.saveIfNotExisted(subtitle);
				answer = subtitle;	
			}
			else if(type == 'name') {
				type = 'write_word_with_English';
				title = '用英文书写这个';	
				answer = correctSolutions;	
			}
			else if(type == 'judge') {
				title = '标记所有正确表达';
				choices = [];
				for(var j=0;j<challenge.choices.length;j++) {
					choices.push({text:challenge.choices[j]});
				}
				var sentences = challenge.metadata.sentences;
				for(var k=0;k<sentences.length;k++) {
					var sentence = sentences[k];
					console.log('sentence=');
					console.log(sentence);
					if(sentence.correct) {
						console.log('correct');
						answer = sentence.sentence;
						break;
					}
				}
			}
			else if(type == 'select') {
				type = 'recognize_word';
				title = "为“" + prompt + "”选择单词";
				answer = challenge.metadata.correct_solutions[0];
				choices = [];
				var options = challenge.metadata.options;
				for(var k=0;k<options.length;k++) {
					var option = options[k];
					wordService.saveIfNotExisted(option.phrase);
					choices.push({text:option.phrase});
				}		
			}
			else if(type == 'form') {
				console.log('here are type form');
				console.log(challenge);
				title = '选词填空';
				type = 'fill_blank';
				var promptPieces = challenge.promptPieces;
				var correctIndex = challenge.correctIndex;

				console.log('promptPieces=');
				subtitle = '';
				answer = '';
				for(var k=0;k<promptPieces.length;k++) {
					console.log(promptPieces[k]);
					if(promptPieces[k] == '.') {
						subtitle += '( )';
						answer += challenge.choices[correctIndex];
					} 
					else {
						subtitle += promptPieces[k];
						answer += promptPieces[k];
					}
				}
				console.log('choices=');
				choices = [];
				challenge.metadata.choices;
				for(var k=0;k<challenge.choices.length;k++) {
					wordService.saveIfNotExisted(challenge.choices[k]);
					choices.push({text:challenge.choices[k]});
				}	
				console.log('finally');
				console.log(title);
				console.log(subtitle);
				console.log(choices);
				console.log(answer);
				//continue;			
			}
			else {
				console.log('unresove type=' + type);
			}



		  	var questionModel = new QuestionModel(practice_id,type,title,subtitle,choices,answer);
		  	var entity = new Model(questionModel);
		  	entity.save(function (err, entity) {
		  	  if (err) return console.error(err);
		  	  //res.status(200).json(entity);
		  	});		
		}
		});     

    }
});


/*

*/
