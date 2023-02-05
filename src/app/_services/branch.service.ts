import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BRANCH_API_URL = 'http://localhost:8090/api/v1/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private http: HttpClient) { }

  getAllBranches(): Observable<any> {
    return this.http.get(BRANCH_API_URL, { responseType: 'json' });
  }
}
