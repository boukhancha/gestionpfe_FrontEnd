import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Group} from "../models/group.model";

const RENDEZVOUS_API_URL = 'http://localhost:8090/api/v1/rendezvous';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private http: HttpClient) { }

  getAllRendezvousByGroupId(groupId: number | undefined) {
    return this.http.get(RENDEZVOUS_API_URL + "/" + groupId, httpOptions);
  }

  createRendezvous(request: string, groupId: number | undefined) {
    return this.http.post(RENDEZVOUS_API_URL + "/" + groupId ,
      {
        request
      }, httpOptions);
  }

  acceptRendezvous(rendezvousId: number | undefined, groupId: number | undefined) {
    return this.http.post(RENDEZVOUS_API_URL + "/" + rendezvousId + "/group/" + groupId + "/accept" , httpOptions);
  }

  rejectRendezvous(decliningMessage: string, rendezvousId: number | undefined, groupId: number | undefined) {
    return this.http.post(RENDEZVOUS_API_URL + "/" + rendezvousId + "/group/" + groupId + "/reject" ,{
      decliningMessage
    }, httpOptions);
  }
}
