import { Component, OnInit, EventEmitter } from '@angular/core';
import { PracticeService } from '../../services/practice.service';
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
  selectedQuestion:any;
  questions = [];
  private sub: any;
  contentType = 'listQuestionDetail'; 
  uploadType = 'image';

  constructor(private route: ActivatedRoute,private router: Router,private practiceService: PracticeService) { }

  ngOnInit() {
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

  uploadImage() {
    this.uploadType = 'image';
  }

  uploadVoice() {
    this.uploadType = 'voice';
  }

  playVoice(filename) {

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
      else {
        this.selectedQuestion.voice = response.filepath;
      }
    }  
  }  


  createQuestion() {
    this.contentType = 'editQuestion';
    this.selectedQuestion = new QuestionModel(this.practice._id,'','','','','',[],'');
  }

}
