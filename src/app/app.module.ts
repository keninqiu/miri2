import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar.component';
import { AdminNavbarComponent } from './core/admin-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FrontendComponent } from './frontend/frontend.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { PracticeDetailComponent } from './practice/practice-detail.component';

import { MessageService } from './services/message.service';
import { ChatService } from './services/chat.service';
import { CategoryService } from './services/category.service';
import { PracticeService } from './services/practice.service';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LessonComponent } from './lesson/lesson.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';
import { AdminCategoryComponent,DialogDeleteCategory } from './admin/admin-category/admin-category.component';
import { AdminChatbotComponent } from './admin/admin-chatbot/admin-chatbot.component';
import { AdminPracticeComponent } from './admin/admin-practice/admin-practice.component';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [
    AppComponent,NavbarComponent,AdminNavbarComponent, AdminComponent, FrontendComponent, RegisterComponent, CategoryComponent,CategoryDetailComponent, ChatbotComponent, LessonComponent, ContactComponent, LoginComponent, PracticeComponent,PracticeDetailComponent, AdminCategoryComponent, AdminChatbotComponent,DialogDeleteCategory, AdminPracticeComponent
  ],
  entryComponents: [
    DialogDeleteCategory
  ], 
  imports: [
    BrowserModule,
    HttpModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgUploaderModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false
    })    
  ],
  providers: [MessageService,ChatService,CategoryService,PracticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
