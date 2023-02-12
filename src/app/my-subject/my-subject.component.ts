import { Component, OnInit } from '@angular/core';
import {Subject} from "../models/subject.model";
import {SubjectService} from "../_services/subject.service";
import {Group} from "../models/group.model";
import {GroupService} from "../_services/group.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {StudentService} from "../_services/student.service";
import {RendezvousService} from "../_services/rendezvous.service";

@Component({
  selector: 'app-my-subject',
  templateUrl: './my-subject.component.html',
  styleUrls: ['./my-subject.component.css']
})
export class MySubjectComponent implements OnInit {

  subject: Subject = new Subject();
  group: Group = new Group();

  rendezvousList: any;

  form: any = {
    driveUrl: null,
    rendezvousRequest: null
  };


  constructor(private subjectService: SubjectService,
              private groupService: GroupService,
              private tokenStorageService: TokenStorageService,
              private studentService: StudentService,
              private rendezvousService: RendezvousService) { }

  ngOnInit(): void {
    this.groupService.getByAcceptedStudent(this.tokenStorageService.getUser().id).subscribe(group => {
      this.group = group;
      this.group.students!.forEach(studentId =>{
        this.group.studentsObjects = [];
        this.studentService.getStudentById(studentId).subscribe(data =>{
          this.group.studentsObjects!.push(data)
        });
        this.subjectService.getSubjectByGroup(this.group.id).subscribe(subject => {
          this.subject = subject;
        });
        this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
          this.rendezvousList = rendezvous;
        });
      });
    });


  }

  onSubmitDriveUrl() {
    this.groupService.createDriveUrl(this.group.id, this.form.driveUrl).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  onSubmitRendezvousRequest() {
    this.rendezvousService.createRendezvous(this.form.rendezvousRequest, this.group.id).subscribe(data => {
      console.log(data);
      this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
        this.rendezvousList = rendezvous;
      });
    }, error => {
      console.log(error);
    });
  }
}