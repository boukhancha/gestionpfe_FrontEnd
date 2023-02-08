import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {Branch} from "../models/branch.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  branches: Branch[] = [];

  title = '';

  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [2, 4, 6, 8];


  constructor(private authService: AuthService, private branchService: BranchService, private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.retrieveBranches();
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

  retrieveBranches(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    if (!params['subject']) {
      this.subjectService.getAllSubjects()
        .subscribe(
          response => {
            this.branches = response;
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
            this.branches = response;
            this.count = response.length;
            console.log(response);
          },
          error => {
            console.log(error);
          });
    }
  }

  retrieveAllBranches(): void {
    this.subjectService.getAllSubjects()
      .subscribe(
        response => {
          this.branches = response;
          this.count = response.length;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }


  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveBranches();
  }

  handlePageSizeChange(event: any):
    void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBranches();
  }

  searchSubject(): void {
    this.page = 1;
    this.retrieveBranches();
  }


  groupArray<T>(data: Array<T>, n: number):
    Array<T[]> {
    let group = new Array<T[]>();

    for (let i = 0, j = 0; i < data.length; i++
    ) {
      if (i >= n && i % n === 0)
        j++;
      group[j] = group[j] || [];
      group[j].push(data[i])
    }

    return group;
  }

  setTitle(searchInput: HTMLInputElement) {
    this.title = searchInput.value;
    this.searchSubject();
  }

}
