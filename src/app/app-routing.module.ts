import * as config from '../../server/common/Config.json';
const ENV = (<any>config).ENV;

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
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminPracticeComponent } from './admin/admin-practice/admin-practice.component';
import { AdminDictionaryComponent } from './admin/admin-dictionary/admin-dictionary.component';
import { AdminChatbotComponent } from './admin/admin-chatbot/admin-chatbot.component'; 

const routes: Routes = [
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
if(ENV == 'dev') {
  routes.push({ path: 'admin', component: AdminComponent });
  routes.push({ path: 'admin/practice/:id', component: AdminPracticeComponent });
  routes.push({ path: 'admin/category', component: AdminCategoryComponent });
  routes.push({ path: 'admin/chatbot', component: AdminChatbotComponent });
  routes.push({ path: 'admin/dictionary', component: AdminDictionaryComponent });
}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
