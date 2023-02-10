import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {UniversityService} from "../_services/university.service";
import {EstablishmentService} from "../_services/establishment.service";
import {DepartmentService} from "../_services/department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-supervisor',
  templateUrl: './register-supervisor.component.html',
  styleUrls: ['./register-supervisor.component.css']
})
export class RegisterSupervisorComponent implements OnInit {

  filter: any = {
    selectedUniversity: null,
    selectedEstablishment: null,
    selectedDepartment: null
  };

  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  universities: any = [];
  establishments: any = [];
  departments: any = [];



  constructor(private authService: AuthService,
              private branchService: BranchService,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService,
              private universityService: UniversityService,
              private establishmentService: EstablishmentService,
              private departmentService: DepartmentService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.retrieveUniversities();
  }
  retrieveUniversities() {
    this.universityService.getAllUniversities().subscribe(response => {
      this.universities = response;
    })
  }

  universityChanged(event: any) {
    this.filter.selectedUniversity = event.target.value;
    if(!this.filter.selectedUniversity) {
      this.establishments = [];
      this.departments = [];
    } else {
      this.establishmentService.getEstablishmentsByUniversity(this.filter.selectedUniversity).subscribe(response => {
        this.establishments = response;
      });
    }
  }

  departmentChanged(event: any) {
    this.filter.selectedDepartment = event.target.value;
  }

  establishmentChanged(event: any) {
    this.filter.selectedEstablishment = event.target.value;
    if(!this.filter.selectedEstablishment) {
      this.departments = [];
    } else {
      this.departmentService.getDepartmentByEstablishment(this.filter.selectedEstablishment).subscribe(response => {
        this.departments = response;
      });
    }
  }
  onSubmit(): void {
    const {firstName, lastName, email, password} = this.form;
    const departmentId = this.filter.selectedDepartment;
    console.log(this.filter.selectedDepartment)
    this.authService.registerSupervisor(firstName, lastName, email, password, departmentId).subscribe(
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
