import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ChatService,Message } from '../services/chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;
  constructor(private messageService: MessageService,private chatService: ChatService) { }

  ngOnInit() {
  	this.messageService.sendMessage('Chatbot');
    this.messages = this.chatService.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  	console.log(this.messages);
  }

  sendMessage() {
    this.chatService.converse(this.formValue);
    this.formValue = '';
  }

}
