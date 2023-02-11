import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const STUDENT_API_URL = 'http://localhost:8090/api/v1/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentById(studentId: number | undefined) {
    return this.http.get(STUDENT_API_URL + "/" + studentId, { responseType: 'json' });
  }
}
