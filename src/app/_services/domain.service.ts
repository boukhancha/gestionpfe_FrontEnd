import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const DOMAIN_API_URL = 'http://localhost:8090/api/v1/domain';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(private http: HttpClient) { }

  getAllDomains(): Observable<any> {
    return this.http.get(DOMAIN_API_URL, {responseType: 'json'});
  }

  createDomain(domain: any, role: any) {
    return this.http.post(DOMAIN_API_URL ,
      {
        "name": domain,
        "role": role
    }, httpOptions);
  }
}
