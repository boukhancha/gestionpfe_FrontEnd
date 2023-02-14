import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../_services/subject.service";
import {TokenStorageService} from "../_services/token-storage.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private subjectService : SubjectService,
              private tokenService : TokenStorageService,
              private toastrService :ToastrService
              ) { }

  form: any = {
    subject: null,
    description: null,
    groupNumber: null
  };
  isSuccessful: boolean = false;

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.form)
    const {subject, description , groupNumber} = this.form;
    this.isSuccessful = true;
    this.subjectService.createSubject(this.tokenService.getUser().id , subject, description,groupNumber).subscribe(
      _ => {
        this.toastrService.success("the subject has been created");
      }
    );
  }
}
