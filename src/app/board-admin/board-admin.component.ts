import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {SubjectService} from "../_services/subject.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private subjectService : SubjectService,
              private tokenService : TokenStorageService
              ) { }

  ngOnInit(): void {

  }

  isSuccessful = false;

  form: any = {
    subject: null,
    description: null,
    groupNumber: null
  };

  onSubmit():void{
    console.log(this.form)
    const {subject, description , groupNumber} = this.form;
    this.subjectService.createSubject(this.tokenService.getUser().id , subject, description,groupNumber).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
      }
    );

  }
}
