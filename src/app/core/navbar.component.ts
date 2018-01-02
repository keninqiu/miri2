// core/navbar.component.ts
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.css'],
})
export class NavbarComponent { 
  selectedItem = 'Home';
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