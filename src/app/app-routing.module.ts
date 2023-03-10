import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {RegisterSupervisorComponent} from "./register-supervisor/register-supervisor.component";
import {SubjectCardComponent} from "./subject-card/subject-card.component";
import {DomainAdminComponent} from "./domain-admin/domain-admin.component";
import {MySubjectComponent} from "./my-subject/my-subject.component";
import {SupervisorSubjectComponent} from "./supervisor-subject/supervisor-subject.component";
import {GroupCardComponent} from "./group-card/group-card.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-student', component: RegisterComponent},
  {path: 'register-supervisor', component: RegisterSupervisorComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'subjectCard/:id', component: SubjectCardComponent},
  {path: 'domain', component: DomainAdminComponent},
  {path: 'superVisorSubject', component: SupervisorSubjectComponent},
  {path: 'my-subject', component: MySubjectComponent},
  {path: 'groupCard/:id', component: GroupCardComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
