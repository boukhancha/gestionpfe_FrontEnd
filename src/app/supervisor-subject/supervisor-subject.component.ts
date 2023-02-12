import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {Subject} from "../models/subject.model";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-supervisor-subject',
  templateUrl: './supervisor-subject.component.html',
  styleUrls: ['./supervisor-subject.component.css']
})
export class SupervisorSubjectComponent implements OnInit {
  content?: string;
  subjects: Array<Subject> = [];

  currentUser: any;


  constructor(private authService: AuthService,
              private branchService: BranchService,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService,
              private token: TokenStorageService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getSubjectsWithSupervisor(this.currentUser.id);
    console.log(this.currentUser.id);
  }


  getSubjectsWithSupervisor(supervisorId: any) {
    this.subjectService.getSubjectBySupervisorId(supervisorId).subscribe(response => {
      console.log(response);
      this.subjects = response;
    }, error => {
      console.log(error);
    });
  };



}
