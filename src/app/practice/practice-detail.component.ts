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
  
  constructor(private route: ActivatedRoute,private practiceService: PracticeService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var practice_id = params['id'];
      this.practiceService.details(practice_id).subscribe(    
        suc => {
          this.practice = suc.practice;
          this.questions = suc.questions;
          this.bufferValue = this.questions.length;
          this.question = this.questions[this.index];
        },
        err => {
          console.log(err);
        }
      );  
    });
  }

}
