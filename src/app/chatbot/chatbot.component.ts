import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  	this.messageService.sendMessage('Chatbot');
  }

}
