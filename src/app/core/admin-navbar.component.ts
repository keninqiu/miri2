// core/navbar.component.ts
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
@Component({
    selector: 'admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['navbar.component.css'],
})
export class AdminNavbarComponent { 
  selectedItem = 'Dashboard';
  subscription: Subscription;

  constructor(private messageService: MessageService) {
        // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => { 
        this.selectedItem = message.text; 
      });
  }  

  listClick(event, newValue) {
	console.log(newValue);
	this.selectedItem = newValue;
  }
}