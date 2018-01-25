import { Component, OnInit,Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  contentType = 'listCategoryDetail';	
  selectedCategory = {id:1};
  constructor(private messageService: MessageService,public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
  	this.messageService.sendMessage('AdminCategory');
  }

  editCategory(id:number) {
  	this.contentType = 'editCategory';
  }
  editPractice(id:number) {
  	this.contentType = 'editCategoryPractice';
  }  
  listCategory(id:number) {
    this.selectedCategory.id = id;
    this.contentType = 'listCategoryDetail';
  }  
  listPractice(id:number) {
    this.router.navigate(['/admin/practice/'+id]);
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