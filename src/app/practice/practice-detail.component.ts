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
  value = 0;
  bufferValue = 100;
  practice: any;
  questions = [];  
  index = 0;
  question:any;
  userAnswer = '';
  rightAnswer = '';
  audio:any;
  answerFlag = 0;
  stage='check';
  
  constructor(private route: ActivatedRoute,private practiceService: PracticeService) { }
  resetRadioForThisQuestion() {
    if(this.question.type != 'recognize_word') {
      return;
    }
    for(var i=0;i<this.question.choices.length;i++) {
      this.question.choices[i].radio =false;
    }
  }
  selectChoice(index) {
    console.log('selectChoice for ' + index);
    this.question.choices[index].radio = true;
    for(var i=0;i<this.question.choices.length;i++) {
      if(i == index) {
        continue;
      }
      this.question.choices[i].radio = false;
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
    this.stage='continue';
  }
  continue() {
    this.stage='check';
    this.question = this.questions[++this.index];
    this.resetRadioForThisQuestion();    
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
          console.log(this.question);
        },
        err => {
          console.log(err);
        }
      );  
    });
  }

}
