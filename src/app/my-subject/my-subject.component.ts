import {Component, OnInit} from '@angular/core';
import {Subject} from "../models/subject.model";
import {SubjectService} from "../_services/subject.service";
import {Group} from "../models/group.model";
import {GroupService} from "../_services/group.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {StudentService} from "../_services/student.service";
import {RendezvousService} from "../_services/rendezvous.service";
import {ToastrService} from "ngx-toastr";

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
    rendezvousRequest: null,
    decliningMessage: null
  };


  constructor(private subjectService: SubjectService,
              private groupService: GroupService,
              public tokenStorageService: TokenStorageService,
              private studentService: StudentService,
              private rendezvousService: RendezvousService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.groupService.getByAcceptedStudent(this.tokenStorageService.getUser().id).subscribe(group => {
      this.group = group;
      this.group.students!.forEach(studentId => {
        this.group.studentsObjects = [];
        this.studentService.getStudentById(studentId).subscribe(data => {
          this.group.studentsObjects!.push(data)
        }, _ => {
          this.toastrService.error("couldn't fetch student by id");
        });
        this.subjectService.getSubjectByGroup(this.group.id).subscribe(subject => {
          this.subject = subject;
        }, _ => {
          this.toastrService.error("couldn't fetch subject by group");
        });
        this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
          this.rendezvousList = rendezvous;
        }, _ => {
          this.toastrService.error("couldn't fetch all rendezvous by group");
        });
      });
    }, _ => {
      this.toastrService.error("couldn't fetch groups bt accepted students");
    });
  }

  onSubmitDriveUrl() {
    this.groupService.createDriveUrl(this.group.id, this.form.driveUrl).subscribe((data: any) => {
      this.group.driveUrl = data.driveUrl
      this.toastrService.success("drive url has been submitted");
    }, error => {
      this.toastrService.error("drive url couldn't be submitted");
    });
  }

  onSubmitRendezvousRequest() {
    this.rendezvousService.createRendezvous(this.form.rendezvousRequest, this.group.id).subscribe(data => {
      this.toastrService.success("rendezvous has been submitted");
      this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
        this.rendezvousList = rendezvous;
      }, _ => {
        this.toastrService.error("couldn't fetch all rendezvous by group id");
      });
    }, _ => {
      this.toastrService.error("couldn't submit a rendezvous");
    });
  }

  acceptRendezvous(rendezvousId: number | undefined, groupId: number | undefined) {
    this.rendezvousService.acceptRendezvous(rendezvousId, groupId).subscribe(data => {
      this.toastrService.success("rendezvous has been accepted");
      this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
        this.rendezvousList = rendezvous;
      }, _ => {
        this.toastrService.error("couldn't fetch all rendezvous by group id");
      });
    }, _ => {
      this.toastrService.error("couldn't accept the rendezvous");
    });
  }

  rejectRendezvous(decliningMessage: HTMLInputElement, rendezvousId: number | undefined, groupId: number | undefined) {
    this.rendezvousService.rejectRendezvous(decliningMessage.value, rendezvousId, groupId).subscribe(data => {
      this.toastrService.success("rendezvous has been rejected");
      this.rendezvousService.getAllRendezvousByGroupId(this.group.id).subscribe(rendezvous => {
        this.rendezvousList = rendezvous;
      }, _ => {
        this.toastrService.error("couldn't fetch all rendezvous by group id");
      });
    }, _ => {
      this.toastrService.error("couldn't rejected the rendezvous");
    });
  }
}
