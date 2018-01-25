import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  contentType = 'listCategoryDetail';	
  selectedCategory = {id:1};
  constructor(private messageService: MessageService) { }

  ngOnInit() {
  	this.messageService.sendMessage('AdminCategory');
  }

  editCategory(id:number) {
  	this.contentType = 'editCategory';
  }
  editCategoryDetail(id:number) {
  	this.contentType = 'editCategoryDetail';
  }  
  listCategory(id:number) {
    this.selectedCategory.id = id;
    this.contentType = 'listCategoryDetail';
  }  
}
