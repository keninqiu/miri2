import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CategoryService } from '../../services/category.service';
import { PracticeService } from '../../services/practice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryModel } from '../../models/category.model';
import { PracticeModel } from '../../models/practice.model';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminCategoryComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  uploadImgType = 'category';
  contentType = 'listCategoryDetail';	
  selectedCategory : any;
  categories = [];
  selectedPractice : any;
  practices = [];
  practicesFilterList = [];

  constructor(private messageService: MessageService,public dialog: MatDialog,private router: Router,private categoryService: CategoryService,private practiceService: PracticeService) { }

  ngOnInit() {
    this.uploadInput = new EventEmitter<UploadInput>();
  	this.messageService.sendMessage('AdminCategory');
    this.categoryService.list().subscribe(    
          suc => {
              //console.log(suc);
              this.categories = suc;
              if(this.categories.length > 0) {
                this.selectedCategory = this.categories[0];


    this.practiceService.list().subscribe(    
          suc => {
              //console.log(suc);
              this.practices = suc;
              console.log('id=' + this.selectedCategory._id);
              this.practicesFilterList = this.practices.filter((practice: PracticeModel) => practice.category_id == this.selectedCategory._id);

          },
          err => {
              console.log(err);
          }
      ); 

              }
          },
          err => {
              console.log(err);
          }
      ); 

  }

  createCategory() {
    this.contentType = 'editCategory';
    this.selectedCategory = new CategoryModel('','','');
  }

  editCategory() {
  	this.contentType = 'editCategory';
  }

  saveCategory() {
    console.log('start save');

    if(this.selectedCategory._id > 0) { // save Category
      this.categoryService.update(this.selectedCategory._id,this.selectedCategory).subscribe(    
          suc => {
              console.log(suc);

          },
          err => {
              console.log(err);
          }
      ); 
    }
    else { // create Category
      this.categoryService.create(this.selectedCategory).subscribe(    
          suc => {
              console.log(suc);
              this.categories.push(suc);
          },
          err => {
              console.log(err);
          }
      ); 
    }
  }
  createPractice() {
    this.contentType = 'editPractice';
    this.selectedPractice = new PracticeModel(this.selectedCategory._id,'','','');
  }  

  savePractice() {
    if(this.selectedPractice._id > 0) { // save Practice
      this.practiceService.update(this.selectedPractice._id,this.selectedPractice).subscribe(    
          suc => {
              console.log(suc);

          },
          err => {
              console.log(err);
          }
      ); 
    }
    else { // create Category
      this.practiceService.create(this.selectedPractice).subscribe(    
          suc => {
              console.log(suc);
              this.practices.push(suc);
              this.practicesFilterList.push(suc);
          },
          err => {
              console.log(err);
          }
      ); 
    }
    this.contentType = 'listCategoryDetail';
  }

  editPractice(practice) {
  	this.contentType = 'editPractice';
    this.selectedPractice = practice;
  }  

  listCategory(category) {
    this.contentType = 'listCategoryDetail';
    this.selectedCategory = category;
    this.practicesFilterList = this.practices.filter((practice: PracticeModel) => practice.category_id == category._id);
  }  
  listPractice(practice) {
  console.log();
    this.router.navigate(['/admin/practice/'+practice._id]);
  }

  deleteCategory() {
    let dialogRef = this.dialog.open(DialogDeleteCategory, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result == 'yes') {
        this.categoryService.delete(this.selectedCategory._id).subscribe(    
            suc => {
                console.log(suc);
                for(var i = this.categories.length - 1; i >= 0; i--) {
                    if(this.categories[i]._id == this.selectedCategory._id) {
                      this.categories.splice(i, 1);
                      break;
                    }
                } 
            },
            err => {
                console.log(err);
            }
        ); 
      }
    });  
  }

  deletePractice(practice) {
    this.selectedPractice = practice;
    let dialogRef = this.dialog.open(DialogDeleteCategory, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'yes') {
        this.practiceService.delete(this.selectedPractice._id).subscribe(    
            suc => {
                for(var i = this.practices.length - 1; i >= 0; i--) {
                    if(this.practices[i]._id == this.selectedPractice._id) {
                      this.practices.splice(i, 1);
                      break;
                    }
                } 
            },
            err => {
                console.log(err);
            }
        ); 
      }
    });   
  }

  uploadCategoryImage(): void {
    this.uploadImgType = 'category';
  }  

  uploadPracticeImage(): void {
    this.uploadImgType = 'practice';
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { 
       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: {}
       };
       this.uploadInput.emit(event);
    } 
    else if(output.type === 'done' && typeof output.file !== 'undefined') {
      console.log('output is:');
      console.log(output);
      var response = output.file.response;
      if(this.uploadImgType == 'category') {
        this.selectedCategory.image = response.filepath;
      }
      else {
        this.selectedPractice.image = response.filepath;
      }
    }  
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
    this.dialogRef.close('yes');
  }

  onCancelClick() {
    console.log('no');
    this.dialogRef.close('no');
  }  

}