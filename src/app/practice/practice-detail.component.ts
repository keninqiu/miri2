import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PracticeService } from '../services/practice.service';

@Component({
  selector: 'app-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeDetailComponent implements OnInit {
  color = 'primary';
  private sub: any;
  mode = 'determinate';
  bufferValue = 100;
  value = 0;
  practice: any;
  questions = [];  
  index = 6;
  question:any;
  userAnswer = '';
  rightAnswer = '';
  audio:any;
  answerFlag = 0;
  stage='check';
  finished = false;
  
  constructor(private route: ActivatedRoute,private practiceService: PracticeService) { }
  resetRadioForThisQuestion() {

    if(this.question.type == 'write_word_with_Chinese' || this.question.type == 'speak_word'){
      console.log('this.question.subtitle=');    
      this.question.subtitle = this.question.choices[0];      
    }
 
  }
  selectChoice(index) {
    console.log('selectChoice for ' + index);
    for(var i=0;i<this.question.choices.length;i++) {
      if(i == index) {
        continue;
      }
      this.userAnswer = this.question.choices[index].text;
      if(this.question.choices[index].voice) {
        this.playVoice(this.question.choices[index].voice);
      }
    }
  }
  playVoice(path:string) {
      this.audio.src = path;
      this.audio.load();
      var playPromise = this.audio.play();    
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          //video.pause();
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }      
  }  
  isRightAnswer() {
    console.log(this.userAnswer);
    var arr = this.question.answer.split(";");
    for(var i=0;i<arr.length;i++) {
      this.rightAnswer = arr[i];
      if(this.rightAnswer == this.userAnswer) {
        return true;
      }
    }

    return false;
  }
  check() {
    if(this.isRightAnswer()) {
      this.answerFlag = 1;
      console.log('correct answer');
    }
    else {
      this.answerFlag = -1;
      console.log('wrong answer');
    }
    this.value = (this.index+1)*100/this.questions.length;
    this.stage='continue';

  }
  continue() {
    if(this.index == this.questions.length - 1) {
      this.finished = true;
    }
    else {
      this.stage='check';
      this.question = this.questions[++this.index];
      console.log('this.question.subtitle=');
      console.log(this.question.subtitle);
      this.resetRadioForThisQuestion();   
      this.userAnswer = ''; 
      this.answerFlag = 0;    
    }
    
  }
  ngOnInit() {
    this.audio = new Audio();
    this.sub = this.route.params.subscribe(params => {
      var practice_id = params['id'];
      this.practiceService.details(practice_id).subscribe(    
        suc => {
          this.practice = suc.practice;
          this.questions = suc.questions;
          this.bufferValue = this.questions.length;
          this.question = this.questions[this.index];
          this.resetRadioForThisQuestion();
          console.log('final=');
          console.log(this.question);
        },
        err => {
          console.log(err);
        }
      );  
    });
  }

}
