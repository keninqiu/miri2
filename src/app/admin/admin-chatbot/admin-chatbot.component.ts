import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ChatbotService } from '../../services/chatbot.service';
import { PracticeService } from '../../services/practice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChatbotModel } from '../../models/chatbot.model';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-admin-chatbot',
  templateUrl: './admin-chatbot.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminChatbotComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  uploadImgType = 'chatbot';
  contentType = 'editChatbot';	
  selectedChatbot : any;
  chatbots = [];

  constructor(private messageService: MessageService,public dialog: MatDialog,private router: Router,private chatbotService: ChatbotService) { }

  ngOnInit() {
    this.uploadInput = new EventEmitter<UploadInput>();
  	this.messageService.sendMessage('AdminChatbot');
    this.chatbotService.list().subscribe(    
          suc => {
              //console.log(suc);
              this.chatbots = suc;
              if(this.chatbots.length > 0) {
                this.selectedChatbot = this.chatbots[0];
              }
          },
          err => {
              console.log(err);
          }
      ); 

  }

  createChatbot() {
    this.contentType = 'editChatbot';
    this.selectedChatbot = new ChatbotModel('','','','dialogflow','','');
  }

  editChatbot() {
  	this.contentType = 'editChatbot';
  }

  saveChatbot() {
    console.log('start save');
    console.log(this.selectedChatbot);
    if(this.selectedChatbot._id > 0) { // save Chatbot
      this.chatbotService.update(this.selectedChatbot._id,this.selectedChatbot).subscribe(    
          suc => {
              console.log(suc);

          },
          err => {
              console.log(err);
          }
      ); 
    }
    else { // create Chatbot
      this.chatbotService.create(this.selectedChatbot).subscribe(    
          suc => {
              console.log(suc);
              this.selectedChatbot = suc;
              this.chatbots.push(suc);
          },
          err => {
              console.log(err);
          }
      ); 
    }
    this.contentType = 'editChatbot';
  }


  listChatbot(chatbot) {
    this.contentType = 'editChatbot';
    this.selectedChatbot = chatbot;
  }  

  deleteChatbot() {
    let dialogRef = this.dialog.open(DialogDeleteChatbot, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result == 'yes') {
        this.chatbotService.delete(this.selectedChatbot._id).subscribe(    
            suc => {
                console.log(suc);
                for(var i = this.chatbots.length - 1; i >= 0; i--) {
                    if(this.chatbots[i]._id == this.selectedChatbot._id) {
                      this.chatbots.splice(i, 1);
                      break;
                    }
                } 
                if(this.chatbots.length > 0) {
                	this.selectedChatbot = this.chatbots[0];
                }
                else {
                	this.selectedChatbot = new ChatbotModel('','','','dialogflow','','');
                }
            },
            err => {
                console.log(err);
            }
        ); 
      }
    });  
  }


  uploadChatbotImage(): void {
    this.uploadImgType = 'chatbot';
  }  


  onUploadOutput(output: UploadOutput): void {
    var data={path:'/assets/chatbot'};
    if (output.type === 'allAddedToQueue') { 
       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: data
       };
       this.uploadInput.emit(event);
    } 
    else if(output.type === 'done' && typeof output.file !== 'undefined') {
      console.log('output is:');
      console.log(output);
      var response = output.file.response;
      if(this.uploadImgType == 'chatbot') {
        this.selectedChatbot.image = response.filepath;
      }
      else {
      }
    }  
  }  
}

@Component({
  selector: 'dialog-delete-chatbot',
  templateUrl: 'dialog-delete-chatbot.html',
})
export class DialogDeleteChatbot {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteChatbot>,
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