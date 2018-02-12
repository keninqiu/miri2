import { Component, OnInit, EventEmitter } from '@angular/core';
import { PracticeService } from '../../services/practice.service';
import { QuestionService } from '../../services/question.service';
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
  showImage = true;
  showVoice = true;

  constructor(private route: ActivatedRoute,private router: Router,private practiceService: PracticeService,private questionService: QuestionService) { }

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
      this.showImage = false;
      this.showVoice = false;
      this.choiceCount = 3;
      this.resetChoiceCount();
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
      choices.push({value: '',image:''});
    }
    this.selectedQuestion = new QuestionModel(this.practice._id,'','','','','',choices,'');  
  }
  createQuestion() {
    this.contentType = 'editQuestion';
    this.resetChoiceCount();
  }
  saveQuestion() {
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
  }
}
