import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    codeApogee: null,
    branchId: 0
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  branches = [];

  constructor(private authService: AuthService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe(data => {
      console.log(data);
      this.branches.push();
    })
  }

  onSubmit(): void {
    const { firstName, lastName, email, password, codeApogee, branchId } = this.form;

    this.authService.registerStudent(firstName, lastName, email, password, codeApogee, branchId).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
