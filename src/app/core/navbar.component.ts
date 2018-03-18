// core/navbar.component.ts
import * as config from '../../../server/common/Config.json';
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
  ENV :string;
  constructor(private messageService: MessageService) {
        // subscribe to home component messages
      this.ENV = (<any>config).ENV;
      this.subscription = this.messageService.getMessage().subscribe(message => { 
        this.selectedItem = message.text; 
      });
  }  
  listClick(event, newValue) {
	console.log(newValue);
	this.selectedItem = newValue;
  }
}