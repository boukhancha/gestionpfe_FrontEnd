import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SUBJECT_API_URL = 'http://localhost:8090/api/v1/pfe-subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjectsByKeyword(keyword: string): Observable<any> {
    return this.http.get(SUBJECT_API_URL + "/search?keyword=" + keyword, { responseType: 'json' });
  }

  getAllSubjects() : Observable<any>{
    return this.http.get(SUBJECT_API_URL, { responseType: 'json' });
  }
}
