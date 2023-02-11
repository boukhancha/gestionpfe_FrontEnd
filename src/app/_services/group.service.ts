import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Group} from "../models/group.model";

const GROUP_API_URL = 'http://localhost:8090/api/v1/student-group';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) { }

  getAllGroupsBySubject(pfeSubject: number | undefined): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(GROUP_API_URL + "/" + pfeSubject, { responseType: 'json' });
  }

  createGroup(pfeSubject: number | undefined, currentStudentId: number) {
    return this.http.post(GROUP_API_URL + "/pfe-subject/" + pfeSubject , {
      currentStudentId
    }, httpOptions);
  }

  joinGroup(pfeSubject: number | undefined, currentStudentId: number, groupId: number | undefined) {
    return this.http.post(GROUP_API_URL + "/pfe-subject/" + pfeSubject + "/join/" + groupId , {
      currentStudentId
    }, httpOptions);
  }

  removeFromGroup(currentStudentId: number, groupId: number | undefined) {
    return this.http.post(GROUP_API_URL + "/remove-student/" + groupId , {
      currentStudentId
    }, httpOptions);
  }
}
