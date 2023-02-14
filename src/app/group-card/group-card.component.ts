import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from "../_services/group.service";
import {Group} from "../models/group.model";
import {Student} from "../models/student.model";
import {StudentService} from "../_services/student.service";
import {RendezvousService} from "../_services/rendezvous.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  group = new Group();
  students: Student[] = [];
  rendezvousList: any;


  constructor(private route : ActivatedRoute,
              private groupService : GroupService,
              private studentServie : StudentService,
              private rendezService : RendezvousService,
              public tokenStorageService: TokenStorageService,
              private toastrService :ToastrService
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
        }, _ => {
          this.toastrService.error("couldn't fetch student");
        })
      });
    }, _ => {
      this.toastrService.error("couldn't fetch group");
    });

    this.rendezService.getAllRendezvousByGroupId(this.group.id).subscribe(data=>{
      this.rendezvousList = data;
    }, _ => {
      this.toastrService.error("couldn't fetch all rendezvous");
    })
  }

  sendDateRendezvous(rendezvous: HTMLInputElement, rendezbousId: number | undefined, groupId: number | undefined) {
    let date = '';
    if(rendezvous.value) {
      date = new Date(rendezvous.value).toISOString();
    } else {
      this.toastrService.error("error in date format");
      return;
    }

    this.rendezService.sendDateRendezvous(date, rendezbousId, groupId).subscribe(data => {
      this.toastrService.success("rendezvous has been updated");
      this.rendezService.getAllRendezvousByGroupId(this.group.id).subscribe(data=>{
        this.rendezvousList = data;
      }, _ => {
        this.toastrService.success("couldn't fetch all rendezvous by group id");
      })
    })
  }

  onSubmitPublishUrl(groupId: number | undefined) {
    this.groupService.publishDriveUrl(groupId).subscribe(data => {
      this.toastrService.success("drive URL has been published");
    }, _ => {
      this.toastrService.error("drive URL couldn't be published");
    })
  }
}
