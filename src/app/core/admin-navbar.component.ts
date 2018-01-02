// core/navbar.component.ts
import { Component } from '@angular/core';
@Component({
    selector: 'admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['navbar.component.css'],
})
export class AdminNavbarComponent { 
  selectedItem = 'Dashboard';
  listClick(event, newValue) {
	console.log(newValue);
	this.selectedItem = newValue;
  }
}