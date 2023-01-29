import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8090/api/login';

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

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API , {
      username,
      email,
      password
    }, httpOptions);
  }
}
