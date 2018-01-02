import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  	this.messageService.sendMessage('Lesson');
  }

}
