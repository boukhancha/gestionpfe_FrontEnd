import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const DEPARTMENT_API_URL = "http://localhost:8090/api/v1/department"

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentByEstablishment(establishmentId: number) {
    return this.http.get(DEPARTMENT_API_URL + "/establishment/" + establishmentId, { responseType: 'json' });
  }
}
