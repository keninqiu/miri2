import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private messageService: MessageService,private router: Router) { }

  ngOnInit() {
  	this.messageService.sendMessage('Category');
  }

  categoryDetail(id:string): void {
    this.router.navigate(['/category/'+id]);
  }
}
