import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryDetailComponent implements OnInit {
  private sub: any;
  category: any;
  practices = [];
  constructor(private route: ActivatedRoute,private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var category_id = params['id'];
      this.categoryService.details(category_id).subscribe(    
        suc => {
          this.category = suc.category;
          this.practices = suc.practices;

        },
        err => {
          console.log(err);
        }
      );  
    });  	
  }
  startPractice(id:string): void {
    this.router.navigate(['/practice/'+id]);
  }
}
