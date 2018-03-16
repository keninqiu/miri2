import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PracticeService } from '../services/practice.service';
import { SpeechRecognitionService } from '../services/speech-recognition.service';
import { MessageService } from '../services/message.service';

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
  category: any;
  questions = [];  
  index = 0;
  question:any;
  userAnswer = '';
  rightAnswer = '';
  audio:any;
  answerFlag = 0;
  stage='check';
  finished = false;
  recording = false;
  
  constructor(private messageService: MessageService,private route: ActivatedRoute,private practiceService: PracticeService,private speechRecognitionService:SpeechRecognitionService,private router: Router) { }
  resetRadioForThisQuestion() {

    if((this.question.type == 'write_word_with_Chinese') || (this.question.type == 'speak_word')|| (this.question.type == 'listen_only')){   
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
    

    var userAnswer = this.userAnswer.replace(/[,.?，。？!！]/g,'').trim().toLowerCase();
    var answer = this.question.answer.replace(/[,.?，。？!！]/g,'').trim().toLowerCase();
    console.log('userAnswer=' + userAnswer);
    console.log('answer=' + answer);
    var answers = answer.split(';');
    var correct = false;
    console.log('answers.length=' + answers.length);
    for(var i=0;i<answers.length;i++) {
      var answer = answers[i].trim();
      console.log('answers.i=' + answer + '==');
      console.log('userAnswer=' + userAnswer + '==');
      /*
      if(answer == userAnswer) {
        console.log('right answer');
        correct = true;
        break;
      }
      */
      var pattern = new RegExp(answer);
      correct = pattern.test(userAnswer);
      if(correct) {
        break;
      }
    }

    return correct;
  }
  check() {
    if(this.isRightAnswer()) {
      this.answerFlag = 1;
      this.playVoice('/assets/voice/Correct-answer.mp3');
      console.log('correct answer');
    }
    else {
      this.answerFlag = -1;
      this.playVoice('/assets/voice/Wrong-answer.mp3');
      console.log('wrong answer');
      var answers = this.question.answer.split(';');
      if(answers) {
        this.rightAnswer = answers[0];
      }
      
    }
    this.value = (this.index+1)*100/this.questions.length;
    this.stage='continue';

  }
  record() {
    this.recording = !this.recording;
    if(this.recording) {
      this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
          console.log(value);  
          this.userAnswer = value;    
        },
        //errror
        (err) => {
          console.log(err);
        },
        //completion
        () => {
          console.log("--complete--");
        }
      );     
    }
    else {
      this.speechRecognitionService.DestroySpeechObject();
    }
  }
  continue() {
    if(this.index == this.questions.length - 1) {
      this.finished = true;
      this.answerFlag = 2;
    }
    else {
      this.stage='check';
      this.question = this.questions[++this.index];
      console.log('type='+this.question.type);
      this.resetRadioForThisQuestion();   
      this.userAnswer = ''; 
      this.answerFlag = 0;    
      this.recording = false;
      if(this.question.subtitle && this.question.subtitle.voice) {
        this.playVoice(this.question.subtitle.voice);
      }
    }
    
  }
  redo() {
    this.index = 0;
    this.answerFlag = 0;
    this.finished = false;
    this.stage='check';
    this.question = this.questions[0];
    this.resetRadioForThisQuestion();   
    this.userAnswer = '';   
    this.recording = false;    
    this.value = (this.index)*100/this.questions.length;
  }
  nextCourse() {
    this.router.navigate(['/category/'+this.category._id]);
  }
  ngOnInit() {
    this.messageService.sendMessage('Category');
    this.audio = new Audio();
    this.sub = this.route.params.subscribe(params => {
      var practice_id = params['id'];
      this.practiceService.details(practice_id).subscribe(    
        suc => {
          this.category = suc.category;
          this.practice = suc.practice;
          this.questions = suc.questions;
          console.log('this.questihbkons=');
          console.log(this.questions);
          this.value = (this.index)*100/this.questions.length;
          this.bufferValue = this.questions.length;
          this.question = this.questions[this.index];
          this.resetRadioForThisQuestion();
          if(this.question.subtitle && this.question.subtitle.voice) {
            this.playVoice(this.question.subtitle.voice);
          }
        },
        err => {
          console.log(err);
        }
      );  
    });
  }

}
