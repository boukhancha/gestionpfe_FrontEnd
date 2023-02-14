import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {Subject} from "../models/subject.model";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


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
              private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getSubjectsWithSupervisor(this.currentUser.id);
  }


  getSubjectsWithSupervisor(supervisorId: any) {
    this.subjectService.getSubjectBySupervisorId(supervisorId).subscribe(response => {
      this.subjects = response;
    }, error => {
      this.toastrService.error("couldn't fetch subjects by supervisor id");
    });
  };


  onSubmitPublishUrl() {

  }
}
