const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MultiParser = require('./multiparser');

const api = require('./server/routes/api');
const app = express();

app.use(MultiParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
// Set our api routes
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.listen(port, function() {
  console.log('listening on ' + port)
})