var url = "https://www.duolingo.com/skill/en/Nature";
var category_id = 40;

var asyncLoop = require('node-async-loop');
const PracticeModel = require("../models/practiceModel.js");
const https = require("https");
var Model = require('../mongoose_models/practiceMongooseModel.js');

var name = url.split('/');
name = name[name.length-1];
url = "https://www.duolingo.com/2017-06-30/skills?fields=skills%7Baccessible,bonus,explanation,finishedLessons,fromLanguage,iconId,id,learningLanguage,lessons,lessonWords,name,shortName,strength,urlName%7D&learningLanguage=en&urlName=" + name;

console.log(url);
var request = require('request');

//var url = 'https://api.github.com/users/rsp';

request.get({
    url: url,
    json: true,
    gzip:true,
    headers: {
    	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    	'Accept-Encoding': 'gzip, deflate, sdch, br',
    	'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
    	'Cache-Control': 'max-age=0',
    	'Connection': 'keep-alive',
    	'Cookie': 'lang=en; logged_out_uuid=743793a3-8fca-4882-ad23-02aaf9531d94; wuuid=245d750a-7d44-49aa-a06d-301d21555e21; __utma=226518408.121014814.1520120064.1520120064.1520120064.1; __utmc=226518408; __utmz=226518408.1520120064.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); auth_tkt="f7746d749b0977731f832103b68657835a9b30bc216598956!userid_type:int"; __qca=P0-1119153843-1520120085441; AWSELB=91E12D7D1E1B37CA82C3043817CF6AE0B5D25E6E40A7CD224194C2ECF0545CB42CF962B1D0595895A66D89C3AF217FC8E8A43365ABA40640229149D9E2FB8A97533D0F96CD; jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjAxMTk5OTYsInN1YiI6MjE2NTk4OTU2LCJleHAiOjE1NTE2NTU5OTZ9.I5IKIwr0RbDXlMxpM1nKNGHVPhD2X-pBI7-mZafy0BQ; mp_mixpanel__c=0',
    	'Host': 'www.duolingo.com',
    	'Upgrade-Insecure-Requests': '1',
    	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
	}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
        console.log(data.skills[0].id);

		
		//var DataSource = {"skills":[{"lessons":5,"accessible":true,"fromLanguage":"zh","strength":0.25,"name":"\u6559\u80b2","learningLanguage":"en","iconId":23,"finishedLessons":5,"lessonWords":[["studies","teacher","note","pens","school","program","education"],["library","test","application","study","example","knowledge","training"],["class","words","chapter","practice","institute","idea","lecture"],["professor","presentation","preparation","explanation","difficulty","universities","course"],["college","objective","teaching","history","pages","report","document","meaning"]],"urlName":"Education","shortName":"\u6559\u80b2","id":"5ec0d62d0f684095996e5a593200d353"}]};
		var DataSource = data;
		var lessonWords = DataSource.skills[0].lessonWords;
		if(lessonWords) {
			for(var i=0;i<lessonWords.length;i++) {
				lessonWords[i].description = lessonWords[i].toString();
				lessonWords[i].index = i+1;
			}
		}
		Model.remove({ category_id: category_id }, function(err, subject) {

			asyncLoop(lessonWords, function (item, next)
			{
				console.log(item);
				var name='Unit ' + item.index;
				var image = '/assets/category/unit_' + item.index + '.jpg';
				if(item.index==8) {
					image = '/assets/category/Unit_8.png';
				}
				else if(item.index == 9) {
					image = '/assets/category/Unit_9.jpg';
				}
				var practiceModel = new PracticeModel(category_id,name,item.description,image);
			  	var entity = new Model(practiceModel);
			  	entity.save(function (err, entity) {
			  	  if (err) {
			  	  	next(err);
			  	  	return console.error(err);
			  	  }
			  	  next();
			  	  //res.status(200).json(entity);
			  	});		

			}, function (err)
			{
			    if (err)
			    {
			        console.error('Error: ' + err.message);
			        return;
			    }
			 
			    console.log('Finished!');
			});

		});   
		  
    }
});
