import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { RegisterSupervisorComponent } from './register-supervisor/register-supervisor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import { DomainAdminComponent } from './domain-admin/domain-admin.component';
import { MySubjectComponent } from './my-subject/my-subject.component';
import { SupervisorSubjectComponent } from './supervisor-subject/supervisor-subject.component';
import { GroupCardComponent } from './group-card/group-card.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    RegisterSupervisorComponent,
    SubjectCardComponent,
    DomainAdminComponent,
    MySubjectComponent,
    SupervisorSubjectComponent,
    GroupCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
