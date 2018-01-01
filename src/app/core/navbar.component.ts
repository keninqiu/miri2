// core/navbar.component.ts
import { Component } from '@angular/core';
@Component({
    selector: 'ct-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.css'],
})
export class NavbarComponent { 
	selectedItem = 'Home';
	listClick(event, newValue) {
	    console.log(newValue);
	    this.selectedItem = newValue;
    }
}