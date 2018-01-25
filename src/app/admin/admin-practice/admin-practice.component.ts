import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-practice',
  templateUrl: './admin-practice.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminPracticeComponent implements OnInit {

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
