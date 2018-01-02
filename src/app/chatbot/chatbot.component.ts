import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages : any; 
  constructor(private messageService: MessageService,private chatService: ChatService) { }

  ngOnInit() {
  	this.messageService.sendMessage('Chatbot');
  	this.messages = [
	  {'content':'haha','sentBy':'user'},
	  {'content':'hehe','sentBy':'bot'}
  	];
  	console.log(this.messages);
  }

}
