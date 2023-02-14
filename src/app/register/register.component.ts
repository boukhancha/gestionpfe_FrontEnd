import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
  branches: any[] = [];

  constructor(private authService: AuthService,
              private branchService: BranchService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe(data => {
      data.forEach((branch: any) => {
        this.branches.push({
          id: branch.id,
          name: branch.name
        });
      })
    }, _ => {
      this.toastrService.error("couldn't fetch all branches")
    })
  }

  onSubmit(): void {
    const { firstName, lastName, email, password, codeApogee, branchId } = this.form;
    console.log(this.form);
    this.authService.registerStudent(firstName, lastName, email, password, codeApogee, branchId).subscribe(
      data => {
        this.toastrService.success("student has been registered")
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.toastrService.success("student couldn't be registered registered")
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  branchChanged(event: any) {
    this.form.branchId = event.target!.value;
  }
}
