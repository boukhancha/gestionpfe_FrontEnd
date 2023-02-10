import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8090/api/login';
const REGISTER_STUDENT_API = 'http://localhost:8090/api/v1/registration/student';
const REGISTER_SUPERVISOR_API = 'http://localhost:8090/api/v1/registration/supervisor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders({
      'username': username,
      'password': password
    });
    const httpOptionsLogin = {
      headers: headers
    };
    return this.http.post(AUTH_API , {
      username,
      password
    }, httpOptionsLogin);
  }

  registerStudent(firstName: string, lastName: string, email: string, password: string, codeApogee: string, branchId: number): Observable<any> {
    return this.http.post(REGISTER_STUDENT_API , {
      firstName, lastName, email, password, codeApogee, branchId
    }, httpOptions);
  }

  registerSupervisor(firstName: any, lastName: any, email: any, password: any, departmentId: any) {
    return this.http.post(REGISTER_SUPERVISOR_API , {
      firstName, lastName, email, password, departmentId
    }, httpOptions);
  }
}
