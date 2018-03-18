var wordCtrl = require('../controllers/wordCtrl.js');
var categoryCtrl = require('../controllers/categoryCtrl.js');
var chatbotCtrl = require('../controllers/chatbotCtrl.js');
var practiceCtrl = require('../controllers/practiceCtrl.js');
var questionCtrl = require('../controllers/questionCtrl.js');
var fileCtrl = require('../controllers/fileCtrl.js');
var config = require('../common/Config.json');

const express = require('express');
const router = express.Router();

/* GET api listing. */
if(config.ENV == 'dev') {
	router.get('/word', wordCtrl.list);
	router.get('/word/load', wordCtrl.load);
	router.get('/word/clear', wordCtrl.clear);
	router.post('/word', wordCtrl.create);
	router.post('/word/search', wordCtrl.search);
	router.put('/word/:id', wordCtrl.update);
	router.delete('/word/:id', wordCtrl.delete);	
	router.post('/category', categoryCtrl.create);
	router.put('/category/:id', categoryCtrl.update);
	router.delete('/category/:id', categoryCtrl.delete);


	router.post('/practice', practiceCtrl.create);
	router.put('/practice/:id', practiceCtrl.update);
	router.delete('/practice/:id', practiceCtrl.delete);


	router.post('/question', questionCtrl.create);
	router.put('/question/:id', questionCtrl.update);
	router.delete('/question/:id', questionCtrl.delete);

	router.get('/chatbot', chatbotCtrl.list);
	router.get('/chatbot/:id', chatbotCtrl.details);
	router.post('/chatbot', chatbotCtrl.create);
	router.put('/chatbot/:id', chatbotCtrl.update);
	router.delete('/chatbot/:id', chatbotCtrl.delete);

	router.post('/file/upload', fileCtrl.upload);

}


router.get('/category', categoryCtrl.list);
router.get('/category/:id', categoryCtrl.details);
router.get('/practice', practiceCtrl.list);
router.get('/practice/:id', practiceCtrl.details);
router.get('/question', questionCtrl.list);




module.exports = router;