import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { FrontendComponent } from './frontend/frontend.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { PracticeComponent } from './practice/practice.component';
import { PracticeDetailComponent } from './practice/practice-detail.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LessonComponent } from './lesson/lesson.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'practice/:id', component: PracticeComponent },
  { path: 'practice-detail/:id', component: PracticeDetailComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'lesson', component: LessonComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: FrontendComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
