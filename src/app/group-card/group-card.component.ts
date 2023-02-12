import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from "../_services/group.service";
import {Group} from "../models/group.model";
import {Student} from "../models/student.model";
import {StudentService} from "../_services/student.service";
import {group} from "@angular/animations";
import {RendezvousService} from "../_services/rendezvous.service";


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  group = new Group();
  students: Student[] = [];
  rendezvousList: any;


  isSuccessful = false;


  constructor(private route : ActivatedRoute,
              private groupService : GroupService,
              private studentServie : StudentService,
              private rendezService : RendezvousService
              ) { }

  ngOnInit(): void {
    this.group = new Group();
    this.students = [];

    this.group.id = this.route.snapshot.params['id'];

    console.log(this.group.id);

    this.groupService.getGroupById(this.group.id).subscribe(data => {
      this.group = data;
      this.group.students?.forEach(studentId => {
        this.group.studentsObjects = [];
        this.studentServie.getStudentById(studentId).subscribe(data => {
          this.group.studentsObjects!.push(data);
        })
      });
    });

    this.rendezService.getAllRendezvousByGroupId(this.group.id).subscribe(data=>{
      this.rendezvousList = data;
    })
  }

  sendDateRendezvous(rendezvous: HTMLInputElement, rendezbousId: number | undefined, groupId: number | undefined) {
    console.log(rendezvous.value);
    let date = new Date(rendezvous.value).toISOString();
    console.log(date);
    this.rendezService.sendDateRendezvous(date, rendezbousId, groupId).subscribe(data => {
      console.log(data);
      this.isSuccessful = true;
      this.rendezService.getAllRendezvousByGroupId(this.group.id).subscribe(data=>{
        this.rendezvousList = data;
      }, error => {
        console.log(error);
      })
    })
  }
}
