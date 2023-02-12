import {Component, OnInit} from '@angular/core';
import {Subject} from "../models/subject.model";
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {GroupService} from "../_services/group.service";
import {StudentService} from "../_services/student.service";
import {Supervisor} from "../models/supervisor.model";
import {Group} from "../models/group.model";
import {Student} from "../models/student.model";



@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent implements OnInit {

  subject = new Subject();

  supervisor = new Supervisor();

  students : []= [];


  groups: Group[] = [];
  groupsCompleted: Group[] = [];

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService,
              private groupService: GroupService,
              public tokenStorageService: TokenStorageService,
              private studentService : StudentService) { }

  ngOnInit(): void {
    this.subject = new Subject();
    this.supervisor = new Supervisor();
    this.students = []

    this.subject.id = this.route.snapshot.params['id'];

    this.subjectService.getSubjectById(this.subject.id)
      .subscribe(data => {
        this.subject = data;
        this.supervisorService.getSupervisorById(data.supervisor).subscribe(data => {
          this.supervisor = data;
        });
        this.groups = this.getAllSubjectsWithStudents();
      }, error => console.log(error));
  }

  joinGroup(groupId: number | undefined) {
    if (this.tokenStorageService.getUser().roles === "STUDENT") {
      this.groupService.joinGroup(this.subject.id, this.tokenStorageService.getUser().id, groupId).subscribe(data => {
        this.groups = this.getAllSubjectsWithStudents();
      }, error => {
        this.groupService.removeFromGroup(this.tokenStorageService.getUser().id, groupId).subscribe(data => {
          this.groups = this.getAllSubjectsWithStudents();
        }, error => {
          console.log(error);
        });
      });
    }
  }

  createGroup() {
    if (this.tokenStorageService.getUser().roles === "STUDENT") {
      this.groupService.createGroup(this.subject.id, this.tokenStorageService.getUser().id).subscribe(data => {
        console.log(data);
        this.groups = this.getAllSubjectsWithStudents();
      }, error => {
        console.log(error);
      });
    }
  }

  acceptGroup(groupId: number | undefined) {
    this.groupService.acceptGroup(groupId).subscribe(data => {
      console.log(data);
      this.groups = this.getAllSubjectsWithStudents();
    })
  }

  refuseGroup(groupId: number | undefined) {
    this.groupService.refuseGroup(groupId).subscribe(data => {
      console.log(data);
      this.groups = this.getAllSubjectsWithStudents();
    })
  }

  getAllSubjectsWithStudents() {
    if(this.tokenStorageService.hasRole("SUPERVISOR")) {
      this.groupsCompleted = [];
      this.groupService.getAllCompletedGroupsBySubject(this.subject.id).subscribe(groups => {
        this.groups = groups;
        let groupsStudent: Group[] = [];
        this.groups.forEach(group =>{
          group.students!.forEach(studentId =>{
            group.studentsObjects = [];
            this.studentService.getStudentById(studentId).subscribe(data =>{
              group.studentsObjects!.push(data)
            })
          });
          groupsStudent.push(group)
        });
        this.groupsCompleted = groupsStudent;
      });
      return this.groupsCompleted;
    } else {
      this.groups = [];
      this.groupService.getAllGroupsBySubject(this.subject.id).subscribe(groups => {
        this.groups = groups;
        let groupsStudent: Group[] = [];
        this.groups.forEach(group =>{
          group.students!.forEach(studentId =>{
            group.studentsObjects = [];
            this.studentService.getStudentById(studentId).subscribe(data =>{
              group.studentsObjects!.push(data)
            })
          });
          groupsStudent.push(group)
        });
        this.groups = groupsStudent;
      });
      return this.groups;
    }
  }
}
