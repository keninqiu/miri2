import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-admin-chatbot',
  templateUrl: './admin-chatbot.component.html',
  styleUrls: ['./admin-chatbot.component.css']
})
export class AdminChatbotComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  	this.messageService.sendMessage('AdminChatbot');
  }

}
