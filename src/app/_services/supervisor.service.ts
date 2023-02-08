import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const SUPERVISOR_API_URL = 'http://localhost:8090/api/v1/supervisor';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(private http: HttpClient) { }

  getSupervisorById(supervisorId: number | undefined) {
    return this.http.get(SUPERVISOR_API_URL + "/" + supervisorId, { responseType: 'json' });
  }
}
