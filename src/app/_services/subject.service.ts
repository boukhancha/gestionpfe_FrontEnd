import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Subject} from "../models/subject.model";

const SUBJECT_API_URL = 'http://localhost:8090/api/v1/pfe-subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }

  getSubjectById(subjectId: number | undefined): Observable<any> {
    return this.http.get(SUBJECT_API_URL + "/pfe-subject/" + subjectId, { responseType: 'json' });
  }

  getSubjectsByKeyword(keyword: string): Observable<any> {
    return this.http.get(SUBJECT_API_URL + "/search?keyword=" + keyword, {responseType: 'json'});
  }

  getAllSubjects(): Observable<any> {
    return this.http.get(SUBJECT_API_URL, {responseType: 'json'});
  }

  getAllSubjectsByUniversity(universityId: number) : Observable<any>{
    return this.http.get(SUBJECT_API_URL + "/university/" + universityId, { responseType: 'json' });
  }

  getAllSubjectsByUniversityAndKeyword(universityId: number, keyword: string) : Observable<any>{
    return this.http.get(SUBJECT_API_URL + "/university/" + universityId + "/search?keyword=" + keyword, { responseType: 'json' });
  }

  getAllSubjectsByEstablishment(establishmentId: number) {
    return this.http.get(SUBJECT_API_URL + "/establishment/" + establishmentId, { responseType: 'json' });
  }

  getAllSubjectsByEstablishmentAndKeyword(establishmentId: number, keyword: string) {
    return this.http.get(SUBJECT_API_URL + "/establishment/" + establishmentId + "/search?keyword=" + keyword, { responseType: 'json' });
  }

  getAllSubjectsByDepartment(departmentId: number) {
    return this.http.get(SUBJECT_API_URL + "/department/" + departmentId, { responseType: 'json' });
  }

  getAllSubjectsByDepartmentAndKeyword(departmentId: number, keyword: string) {
    return this.http.get(SUBJECT_API_URL + "/department/" + departmentId + "/search?keyword=" + keyword, { responseType: 'json' });
  }


  createSubject(supervisor: any ,  subject: any, description: any, groupNumber: any) {
    return this.http.post(SUBJECT_API_URL ,
      {
        "supervisor": supervisor,
        "subject": subject,
        "description": description,
        "groupNumber": groupNumber
      }, httpOptions);
  }


  getSubjectBySupervisorId(supervisorId: any): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(SUBJECT_API_URL +'/'+ supervisorId, { responseType: 'json' });
  }
}
