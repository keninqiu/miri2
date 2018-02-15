import { Component, OnInit,EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { WordService } from '../../services/word.service';
import { WordModel } from '../../models/word.model';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-admin-dictionary',
  templateUrl: './admin-dictionary.component.html',
  styleUrls: ['../admin.component.css']
})
export class AdminDictionaryComponent implements OnInit {
	uploadInput: EventEmitter<UploadInput>;
  contentType = 'listWord'; 
  selectedWord:any;
  words = [];
  uploadImgType:any;
  audio:any;

  constructor(private messageService: MessageService,private wordService: WordService) { }

  ngOnInit() {
    this.audio = new Audio();
    this.uploadInput = new EventEmitter<UploadInput>();
  	this.messageService.sendMessage('AdminDictionary');
    this.wordService.list().subscribe(    
          suc => {
              this.words = suc;
          },
          err => {
              console.log(err);
          }
      );   	
  }

  editWord(word) {
  	this.contentType = 'editWord';
  	this.selectedWord = word;
  }
  deleteWord(word) {

        this.wordService.delete(word._id).subscribe(    
            suc => {
                for(var i = this.words.length - 1; i >= 0; i--) {
                    if(this.words[i]._id == word._id) {
                      this.words.splice(i, 1);
                      break;
                    }
                } 
            },
            err => {
                console.log(err);
            }
        ); 
  }

  createWord() {
    this.contentType = 'editWord';
    this.selectedWord = new WordModel('','','');
  }

  playVoice(path:string) {
      this.audio.src = path;
      this.audio.load();
      this.audio.play();    
  }

  pauseVoice() {
    this.audio.pause();
  }

  saveWord() {

    if(this.selectedWord._id > 0) { // save
      this.wordService.update(this.selectedWord._id,this.selectedWord).subscribe(    
          suc => {
              console.log(suc);

          },
          err => {
              console.log(err);
          }
      ); 
    }
    else { // create 
      this.wordService.create(this.selectedWord).subscribe(    
          suc => {
              this.words.push(suc);
          },
          err => {
              console.log(err);
          }
      ); 
    }

    this.contentType = 'listWord';
  } 

  uploadVoice(): void {
    this.uploadImgType = 'voice';
  }  

  uploadImage(): void {
    this.uploadImgType = 'image';
  }

  onUploadOutput(output: UploadOutput): void {
    var data={path:'/assets/dictionary/image'};
    if(this.uploadImgType == 'voice') {
      data = {path:'/assets/dictionary/voice'};
    }
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
      var response = output.file.response;
      if(this.uploadImgType == 'voice') {
        this.selectedWord.voice = response.filepath;
      }
      else {
        this.selectedWord.image = response.filepath;
      }
    }  
  }     
}
