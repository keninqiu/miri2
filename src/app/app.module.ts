import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar.component';
import { AdminNavbarComponent } from './core/admin-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FrontendComponent } from './frontend/frontend.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';

import { MessageService } from './services/message.service';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LessonComponent } from './lesson/lesson.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,NavbarComponent,AdminNavbarComponent, AdminComponent, FrontendComponent, RegisterComponent, CategoryComponent, ChatbotComponent, LessonComponent, ContactComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
