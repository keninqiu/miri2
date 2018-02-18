import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from '../services/message.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories = [];
  constructor(private messageService: MessageService,private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
  	this.messageService.sendMessage('Category');
    this.categoryService.list().subscribe(    
      suc => {
        this.categories = suc;
      },
      err => {
        console.log(err);
      }
    ); 
  }

  categoryDetail(id:string): void {
    this.router.navigate(['/category/'+id]);
  }
}
