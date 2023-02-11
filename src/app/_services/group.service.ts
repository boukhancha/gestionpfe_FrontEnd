import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Group} from "../models/group.model";

const GROUP_API_URL = 'http://localhost:8090/api/v1/student-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) { }

  getAllGroupsBySubject(pfeSubject: number | undefined): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(GROUP_API_URL + "/" + pfeSubject, { responseType: 'json' });
  }

}
