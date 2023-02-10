import { Component, OnInit } from '@angular/core';
import {Subject} from "../models/subject.model";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {Supervisor} from "../models/supervisor.model";

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent implements OnInit {

  subject = new Subject();

  supervisor = new Supervisor();

  constructor(private route: ActivatedRoute , private subjectService: SubjectService , private supervisorService: SupervisorService) { }

  ngOnInit(): void {
    this.subject = new Subject();
    this.supervisor = new Supervisor();

    this.subject.id = this.route.snapshot.params['id'];



    this.subjectService.getSubjectById(this.subject.id)
      .subscribe(data => {
        console.log(data)
        this.subject = data;
        this.supervisor.id = data.supervisor;
        console.log(this.supervisor.id)
      }, error => console.log(error));

  }









}
