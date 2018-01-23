import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LessonComponent } from './lesson/lesson.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PracticeComponent } from './practice/practice.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminChatbotComponent } from './admin/admin-chatbot/admin-chatbot.component';
@NgModule({
  declarations: [
    AppComponent,NavbarComponent,AdminNavbarComponent, AdminComponent, FrontendComponent, RegisterComponent, CategoryComponent,CategoryDetailComponent, ChatbotComponent, LessonComponent, ContactComponent, LoginComponent, PracticeComponent,PracticeDetailComponent, AdminCategoryComponent, AdminChatbotComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
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
  providers: [MessageService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
