// Example middleware for handling multipart forms. It should be
// "used" by an app sometime before the bodyDecoder.
//
// var Express = require('express');
// var MultiParser = require('./multiparser');
//
// var app = Express.createServer();
// app.use(MultiParser());
// app.use(Express.bodyDecoder());
const fs = require('fs');
var Formidable = require('formidable');

exports = module.exports = function bodyParser(opt) {
  return function bodyParser(req, res, next) {
    var parser = exports.parse[mime(req)]; 
    if (parser && !req.body) {
      parser(opt, req, res, next);
    }
    else {
      next();
    }
  };
};

// Grab the general mime type from a request.
function mime(req) {
  var str = req.headers['content-type'] || '';
  return str.split(';')[0];
}

function parseMultipart(opt, req, res, next) {
  var form = new Formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
      console.log('file.name=' + file.name);
      file.path = __dirname + '/dist/assets/uploads/' + file.name;
  });  
  form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
      var filepath = 'assets/uploads/' + file.name;
      var response = {
        "success":true,
        "filepath":filepath 
      }; 
      return res.status(200).json(response);       
  });  

  /*
  form.parse(req, function(err, fields, files) {
    if (err)
      next(err);
    else {
      req.body = extend(fields, files);
      console.log('files.file=');
      console.log(files.file);

      var oldpath = files.file.path;
      var newpath = __dirname + '/dist/assets/uploads/' + files.file.name;

      var filepath = 'assets/uploads/' + files.file.name;

      var srcpath = __dirname + '/src/assets/uploads/' + files.file.name;

      fs.createReadStream(oldpath).pipe(fs.createWriteStream(srcpath));
    
      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;
      });

      var response = {
        "success":true,
        "filepath":filepath 
      }; 
      return res.status(200).json(response); 

      next();
    }
  });
  */
}

function extend(target) {
  var key, obj;

  for (var i = 1, l = arguments.length; i < l; i++) {
    if ((obj = arguments[i])) {
      for (key in obj)
        target[key] = obj[key];
    }
  }

  return target;
}

exports.parse = {
  'multipart/form-data': parseMultipart
};