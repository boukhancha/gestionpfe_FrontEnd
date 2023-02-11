import { Component, OnInit } from '@angular/core';
import {Subject} from "../models/subject.model";
import { ActivatedRoute } from '@angular/router';
import {SubjectService} from "../_services/subject.service";
import {SupervisorService} from "../_services/supervisor.service";
import {GroupService} from "../_services/group.service";
import {Supervisor} from "../models/supervisor.model";
import {Group} from "../models/group.model";

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent implements OnInit {

  subject = new Subject();

  supervisor = new Supervisor();

  groups: Group[] = [];

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private supervisorService: SupervisorService,
              private groupService :GroupService) { }

  ngOnInit(): void {
    this.subject = new Subject();
    this.supervisor = new Supervisor();

    this.subject.id = this.route.snapshot.params['id'];

    this.subjectService.getSubjectById(this.subject.id)
      .subscribe(data => {
        console.log(data)
        this.subject = data;
        this.supervisorService.getSupervisorById(data.supervisor).subscribe(data =>{
          this.supervisor = data;
        });
        this.groupService.getAllGroupsBySubject(this.subject.id).subscribe(groups => {
          this.groups = groups;
          console.log(this.groups)
        });
      }, error => console.log(error));
  }
}
