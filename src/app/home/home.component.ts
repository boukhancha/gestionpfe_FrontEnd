import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {BranchService} from "../_services/branch.service";
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {UniversityService} from "../_services/university.service";
import {EstablishmentService} from "../_services/establishment.service";
import {DepartmentService} from "../_services/department.service";
import {Subject} from "../models/subject.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  subjects: Subject[] = [];

  universities: any = [];
  establishments: any = [];
  departments: any = [];

  keyword = '';

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15, 18];
  filter: any = {
    selectedUniversity: null,
    selectedEstablishment: null,
    selectedDepartment: null
  };


  constructor(private authService: AuthService,
              private branchService: BranchService,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService,
              private universityService: UniversityService,
              private establishmentService: EstablishmentService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.retrieveSubject();
    this.retrieveUniversities();
  }

  retrieveSubject(): void {
    if (this.filter.selectedDepartment && !this.keyword) {
      this.retrieveAllSubjectsByDepartment();
    } else if (this.filter.selectedDepartment && this.keyword) {
      this.retrieveAllSubjectsByDepartmentAndKeyword();
    } else if (this.filter.selectedEstablishment && !this.keyword) {
      this.retrieveAllSubjectsByEstablishment();
    } else if (this.filter.selectedEstablishment && this.keyword) {
      this.retrieveAllSubjectsByEstablishmentAndKeyword();
    } else if (this.filter.selectedUniversity && !this.keyword) {
      this.retrieveAllSubjectsByUniversity();
    } else if (this.filter.selectedUniversity && this.keyword) {
      this.retrieveAllSubjectsByUniversityAndKeyword();
      console.log(this.keyword);
    } else if (!this.keyword) {
      this.subjectService.getAllSubjects()
        .subscribe(
          response => {
            this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
          },
          error => {
            console.log(error);
          });
    } else if (this.keyword) {
      this.subjectService.getSubjectsByKeyword(this.keyword)
        .subscribe(
          response => {
            this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
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

  setKeyword(searchInput: HTMLInputElement) {
    this.keyword = searchInput.value;
    this.searchSubject();
  }

  retrieveUniversities() {
    this.universityService.getAllUniversities().subscribe(response => {
      this.universities = response;
    })
  }

  universityChanged(event: any) {
    this.filter.selectedUniversity = event.target.value;
    this.establishmentService.getEstablishmentsByUniversity(this.filter.selectedUniversity).subscribe(response => {
      this.establishments = response;
    });
    this.page = 1;
    this.retrieveSubject();
  }

  establishmentChanged(event: any) {
    this.filter.selectedEstablishment = event.target.value;
    this.departmentService.getDepartmentByEstablishment(this.filter.selectedEstablishment).subscribe(response => {
      this.departments = response;
    });
    this.retrieveSubject();
  }

  departmentChanged(event: any) {
    this.filter.selectedDepartment = event.target.value;
    this.retrieveSubject();
  }

  getSubjectsWithSupervisor(subject: any, response: any) {
    let subjects: any = [];
    response.forEach((subject: any) => {
      this.supervisorService.getSupervisorById(subject.supervisor).subscribe(response => {
        subject.supervisorObject = response;
        subjects.push(subject);
      }, error => {
        console.log(error);
      });
    });
    this.count = response.length;
    return subjects;
  }

  retrieveAllSubjectsByUniversity() {
    this.subjectService.getAllSubjectsByUniversity(this.filter.selectedUniversity).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }

  retrieveAllSubjectsByUniversityAndKeyword() {
    this.subjectService.getAllSubjectsByUniversityAndKeyword(this.filter.selectedUniversity, this.keyword).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }

  retrieveAllSubjectsByEstablishment() {
    this.subjectService.getAllSubjectsByEstablishment(this.filter.selectedEstablishment).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }

  retrieveAllSubjectsByEstablishmentAndKeyword() {
    this.subjectService.getAllSubjectsByEstablishmentAndKeyword(this.filter.selectedEstablishment, this.keyword).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }

  retrieveAllSubjectsByDepartment() {
    this.subjectService.getAllSubjectsByDepartment(this.filter.selectedDepartment).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }

  retrieveAllSubjectsByDepartmentAndKeyword() {
    this.subjectService.getAllSubjectsByDepartmentAndKeyword(this.filter.selectedDepartment, this.keyword).subscribe(response => {
      this.subjects = this.getSubjectsWithSupervisor(this.subjects, response);
      this.count = this.subjects.length;
    });
  }
}
