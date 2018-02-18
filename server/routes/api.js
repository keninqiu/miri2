var wordCtrl = require('../controllers/wordCtrl.js');
var categoryCtrl = require('../controllers/categoryCtrl.js');
var practiceCtrl = require('../controllers/practiceCtrl.js');
var questionCtrl = require('../controllers/questionCtrl.js');
var fileCtrl = require('../controllers/fileCtrl.js');
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/word', wordCtrl.list);
router.post('/word', wordCtrl.create);
router.put('/word/:id', wordCtrl.update);
router.delete('/word/:id', wordCtrl.delete);

router.get('/category', categoryCtrl.list);
router.get('/category/:id', categoryCtrl.details);
router.post('/category', categoryCtrl.create);
router.put('/category/:id', categoryCtrl.update);
router.delete('/category/:id', categoryCtrl.delete);

router.get('/practice', practiceCtrl.list);
router.get('/practice/:id', practiceCtrl.details);
router.post('/practice', practiceCtrl.create);
router.put('/practice/:id', practiceCtrl.update);
router.delete('/practice/:id', practiceCtrl.delete);

router.get('/question', questionCtrl.list);
router.post('/question', questionCtrl.create);
router.put('/question/:id', questionCtrl.update);
router.delete('/question/:id', questionCtrl.delete);

router.post('/file/upload', fileCtrl.upload);
module.exports = router;