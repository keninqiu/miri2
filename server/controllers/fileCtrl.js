const fs = require('fs');
var formidable = require('formidable');
module.exports = {
  upload : function(req, res) {
    //this function was moved to multiparser.js
    /*
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var courseName = fields.courseName;

      var oldpath = files.file.path;
      var newpath = __dirname + '/../../dist/assets/uploads/' + files.file.name;

      var filepath = 'assets/uploads/' + files.file.name;

      var srcpath = __dirname + '/../../src/assets/uploads/' + files.file.name;

      fs.createReadStream(oldpath).pipe(fs.createWriteStream(srcpath));
    
      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;
      });

      var response = {
        "success":true,
        "filepath":filepath 
      }; 
      return res.status(200).json(response);       
    });

  
    return res.status(200);    
    */
  }
}