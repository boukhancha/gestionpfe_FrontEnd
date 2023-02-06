import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {Branch} from "../models/branch.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  branches : Branch[] = [];
  CurrentBranche : Branch = {};

  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];




  constructor(private authService: AuthService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.retrieveBranches();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
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

    this.branchService.getAllBranches()
      .subscribe(
        response => {
          const { branches, nbrBranches } = response;
          this.branches = response;
          this.count = nbrBranches;
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

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBranches();
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveBranches();
  }

  setActiveTutorial(branch: Branch, index: number): void {
    this.CurrentBranche = branch;
    this.currentIndex = index;
  }

}


