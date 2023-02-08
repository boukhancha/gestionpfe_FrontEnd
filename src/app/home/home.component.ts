import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {Subject} from "../models/subject.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  subjects: Subject[] = [];

  title = '';

  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [2, 4, 6, 8];


  constructor(private authService: AuthService,
              private branchService: BranchService,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService) {
  }

  ngOnInit(): void {
    this.retrieveSubject();
  }

  getRequestParams(searchSubject: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchSubject) {
      params[`subject`] = searchSubject;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveSubject(): void {
    this.subjects = [];
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    if (!params['subject']) {
      this.subjectService.getAllSubjects()
        .subscribe(
          response => {
            response.forEach((subject: any) => {
              this.supervisorService.getSupervisorById(subject.supervisor).subscribe(response => {
                subject.supervisorObject = response;
                this.subjects.push(subject);
              }, error => {
                console.log(error);
              });
            });
            this.count = response.length;
            console.log(response);
          },
          error => {
            console.log(error);
          });
    } else {
      this.subjectService.getSubjectsByKeyword(params['subject'])
        .subscribe(
          response => {
            this.subjects = response;
            this.subjects.forEach((subject) => {
              this.supervisorService.getSupervisorById(subject.supervisor).subscribe(response => {
                subject.supervisorObject = response;
                console.log(subject.supervisorObject);
              }, error => {
                console.log(error);
              });
            });
            this.count = response.length;
            console.log(response);
          },
          error => {
            console.log(error);
          });
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveSubject();
  }

  handlePageSizeChange(event: any):
    void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveSubject();
  }

  searchSubject(): void {
    this.page = 1;
    this.retrieveSubject();
  }

  setTitle(searchInput: HTMLInputElement) {
    this.title = searchInput.value;
    this.searchSubject();
  }

}
