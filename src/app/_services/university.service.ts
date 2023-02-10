import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const UNIVERSITY_API_URL = 'http://localhost:8090/api/v1/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  getAllUniversities() {
    return this.http.get(UNIVERSITY_API_URL, { responseType: 'json' });
  }
}
