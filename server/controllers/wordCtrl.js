const WordModel = require("../models/wordModel.js");
var Model = require('../mongoose_models/wordMongooseModel.js');
var googleTTS = require('google-tts-api');
var https = require('https');
var fs = require('fs');

module.exports = {
  list : function(req, res) {
  	Model.find({}, function (err, entities) {
  	  return res.status(200).json(entities);
  	}).sort('voice');
  }, 
  clear:function(req, res) {
    Model.find({}, function (err, entities) {
      for(var i=0;i<entities.length;i++) {
        var word = entities[i];
        var text = word.text;
        var voice = word.voice;
        var image = word.image;
        var _id = word._id;
        if(voice) {
          if(!voice.startsWith('/')) {
            voice = '/' + voice;
          }
          var srcpath = __dirname + '/../../src' + voice;
          //console.log('srcpath=' + srcpath);
          if (!fs.existsSync(srcpath)) {
              console.log('do something for ' + _id);
              // Do something
              var wordModel = new WordModel(text,'',image);
              Model.findByIdAndUpdate(_id,{ $set: wordModel}, { new: true },function(err, word) {
                if (err) console.log(err);
                //return res.status(200).json(word);
              }
              );  

          }          
        }   
        if(image) {
          if(!image.startsWith('/')) {
            image = '/' + image;
          }
          var srcpath = __dirname + '/../../src' + image;
          //console.log('srcpath=' + srcpath);
          if (!fs.existsSync(srcpath)) {
              console.log('do something for ' + _id);
              // Do something
              var wordModel = new WordModel(text,voice,'');
              Model.findByIdAndUpdate(_id,{ $set: wordModel}, { new: true },function(err, word) {
                if (err) console.log(err);
                //return res.status(200).json(word);
              }
              );  

          }          
        } 

      }
    }).sort('voice');      
  },
  load : function(req, res) {
    Model.find({}, function (err, entities) {
      for(var i=0;i<entities.length;i++) {
        var word = entities[i];
        var text = word.text;
        var voice = word.voice;
        var image = word.image;
        var _id = word._id;


        var isChinese = false;   
        for(var j = 0; j < text.length; j++){
          if(text.charCodeAt(j) > 255){
            isChinese = true;
            break;
          }
        }             

        if(!image) {
          var textArray = text.split(" ");
          if((textArray.length == 1) && !isChinese) {
            console.log('download image for ' + text);
          }
        }
        if(!voice && !isChinese) {
          googleTTS(text, 'en', 1)   // speed normal = 1 (default), slow = 0.24
          .then(function (url) {
            //console.log('text=' + text);
            var filename = text.replace(/\s/g, '_');
            filename = filename.replace(/(\"|\'|\,|\.|\?|，|。|？|\!|！)/g, '');
            //console.log(url); // https://translate.google.com/translate_tts?...
            var path = '/assets/dictionary/voice';
            var fileFullname = filename + ".mp3";
            var voice = path + '/' + fileFullname;
            var srcpath = __dirname + '/../../src' + path + '/' + fileFullname;
            var distpath = __dirname + '/../../dist' + path + '/' + fileFullname;            
            var srcfile = fs.createWriteStream(srcpath);
            var distfile = fs.createWriteStream(distpath);
            var request = https.get(url, function(response) {
              response.pipe(srcfile);
              response.pipe(distfile);

              var wordModel = new WordModel(text,voice,image);
              Model.findByIdAndUpdate(_id,{ $set: wordModel}, { new: true },function(err, word) {
                if (err) console.log(err);
                //return res.status(200).json(word);
              }
              );               
            });   
          })
          .catch(function (err) {
            console.error(err.stack);
          });
          break;
        }
      }
      return res.status(200).json(entities);
    }).sort('voice');
  },   
  search: function(req, res) {
    var body = req.body; 
    var text = body.text; 
    //console.log('text is:::' + text);
    Model.find({text:text}, function (err, entities) {
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