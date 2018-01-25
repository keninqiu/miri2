import { Component, OnInit,Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  contentType = 'listCategoryDetail';	
  selectedCategory = {id:1};
  constructor(private messageService: MessageService,public dialog: MatDialog) { }

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
  deleteCategory(id:number) {
    let dialogRef = this.dialog.open(DialogDeleteCategory, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });  
  }
}

@Component({
  selector: 'dialog-delete-category',
  templateUrl: 'dialog-delete-cateogry.html',
})
export class DialogDeleteCategory {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onConfirmClick() {
    console.log('yes, delete it');
    this.dialogRef.close();
  }

  onCancelClick() {
    console.log('no');
    this.dialogRef.close();
  }  

}