import { Component, OnInit, EventEmitter } from '@angular/core';
import { PracticeService } from '../../services/practice.service';
import { QuestionService } from '../../services/question.service';
import { WordService } from '../../services/word.service';
import { WordModel } from '../../models/word.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionModel } from '../../models/question.model';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-admin-practice',
  templateUrl: './admin-practice.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminPracticeComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  practice:any;
  audio:any;
  selectedQuestion:any;
  questions = [];
  private sub: any;
  contentType = 'listQuestionDetail'; 
  uploadType = 'image';
  choiceCount = 4;
  choiceIndex = 0;
  showSubTitle = true;
  showChoices = true;
  showAnswer = true;

  constructor(private route: ActivatedRoute,private router: Router,private practiceService: PracticeService,private questionService: QuestionService,private wordService:WordService) { }

  ngOnInit() {

    this.audio = new Audio();
    this.uploadInput = new EventEmitter<UploadInput>();
    this.sub = this.route.params.subscribe(params => {
      var practice_id = params['id'];
      this.practiceService.details(practice_id).subscribe(    
        suc => {
          this.practice = suc.practice;
          this.questions = suc.questions;

        },
        err => {
          console.log(err);
        }
      );  
    });
  }
  onChangeType(type) {
    console.log(type);

    if(type == 'recognize_word') {
      this.showSubTitle = false;
      this.showChoices = true;
      this.showAnswer = true;
    }
    else if((type == 'write_word_with_Chinese') || (type == 'write_word_with_English') || (type == 'speak_word') || (type == 'listen_only')) {
      this.showSubTitle = true;
      this.showChoices = false;
      this.showAnswer = true;
    }
    else if(type == 'fill_blank') {
      this.showSubTitle = true;
      this.showChoices = true;   
      this.showAnswer = true; 
    } 

    if(type == 'write_word_with_Chinese') {
      this.selectedQuestion.title = '用中文书写这个';
    }
    else if(type == 'write_word_with_English') {
      this.selectedQuestion.title = '用英文书写这个';
    }
    else if(type == 'speak_word') {
      this.selectedQuestion.title = '单击麦克风并说出';
      this.showAnswer = false;
    }    
    else if(type == 'listen_only') {
      this.selectedQuestion.title = '键入你听到的内容';
      this.showAnswer = false;    
    }
    else if(type == 'fill_blank') {
      this.selectedQuestion.title = '选词填空';
    }    
  }

  uploadImage() {
    this.uploadType = 'image';
  }

  uploadVoice() {
    this.uploadType = 'voice';
  }

  playVoice(path:string) {
      this.audio.src = path;
      this.audio.load();
      this.audio.play();    
  }

  uploadChoiceImage(index:number) {
    this.uploadType = 'choice';
    this.choiceIndex = index;
  }

  pauseVoice() {
    this.audio.pause();
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { 
       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: {}
       };
       this.uploadInput.emit(event);
    } 
    else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      if(this.uploadType == 'image') {
        this.selectedQuestion.image = response.filepath;
      }
      else if(this.uploadType == 'voice'){
        this.selectedQuestion.voice = response.filepath;
      }
      else if(this.uploadType == 'choice') {
        this.selectedQuestion.choices[this.choiceIndex].image = response.filepath;
      }
    }  
  }  

  resetChoiceCount() {
    var choices = [];
    for (var i = 0; i < this.choiceCount; i++) { 
      choices.push({text: ''});
    }
    
  }
  createQuestion() {
    console.log('createQuestion');
    this.contentType = 'editQuestion';

    var choices = [];
    for (var i = 0; i < this.choiceCount; i++) { 
      choices.push({text: ''});
    }    
    this.selectedQuestion = new QuestionModel(this.practice._id,'recognize_word','','',choices,''); 
    this.showSubTitle = false; 
    this.resetChoiceCount();
    console.log('showSubTitle===' + this.showSubTitle);
  }

  editQuestion(question) {
    this.selectedQuestion = question;
    this.onChangeType(this.selectedQuestion.type);
    this.contentType = 'editQuestion';
  }

  deleteQuestion(question) {
        this.questionService.delete(this.selectedQuestion._id).subscribe(    
            suc => {
                for(var i = this.questions.length - 1; i >= 0; i--) {
                    if(this.questions[i]._id == question._id) {
                      this.questions.splice(i, 1);
                      break;
                    }
                } 
            },
            err => {
                console.log(err);
            }
        ); 
  }

  saveWordIfNotExisted(textModel) {
    this.wordService.search(textModel).subscribe(    
      suc => {
        console.log(suc);
        if(suc.length == 0) {
          console.log('suc is empty');
          var wordModel = new WordModel(textModel.text,'','');
          this.wordService.create(wordModel).subscribe(
            suc => {
              console.log(suc);
            },
            err => {
              console.log(err);
            }
          ); 
        }
      },
      err => {
        console.log(err);
      }
    ); 
  }

  saveQuestion() {
    if(this.selectedQuestion.type == 'speak_word' || this.selectedQuestion.type == 'listen_only') {
      this.selectedQuestion.answer = this.selectedQuestion.subtitle;
    }
    if(this.selectedQuestion._id > 0) { // save Question
      this.questionService.update(this.selectedQuestion._id,this.selectedQuestion).subscribe(    
          suc => {
              console.log(suc);

          },
          err => {
              console.log(err);
          }
      ); 
    }
    else { // create Category
      this.questionService.create(this.selectedQuestion).subscribe(    
          suc => {
              console.log(suc);
              this.questions.push(suc);
          },
          err => {
              console.log(err);
          }
      ); 
    }  
    
    if(this.selectedQuestion.type == 'recognize_word') {
      console.log('recognize_word');
      for (var i = 0; i < this.selectedQuestion.choices.length; i++) {
        console.log('i='+i);
        this.saveWordIfNotExisted(this.selectedQuestion.choices[i]);
      }
    }
    else if(this.selectedQuestion.type == 'speak_word' || this.selectedQuestion.type == 'write_word_with_Chinese' || this.selectedQuestion.type == 'listen_only') {
      this.saveWordIfNotExisted({text:this.selectedQuestion.subtitle});
    }
    this.contentType = 'listQuestionDetail';
    this.selectedQuestion.title = '';
    this.showSubTitle = true;
    this.showChoices = true;
  }
}
