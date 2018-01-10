import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	
  }
  startPractice(id:string): void {
    this.router.navigate(['/practice/'+id]);
  }
}
