import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const UNIVERSITY_API_URL = "http://localhost:8090/api/v1/establishment"

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private http: HttpClient) { }

  getEstablishmentsByUniversity(universityId: number) {
    return this.http.get(UNIVERSITY_API_URL + "/university/" + universityId, { responseType: 'json' });
  }

}
