import { Component, OnInit } from '@angular/core';
import {DomainService} from "../_services/domain.service";

@Component({
  selector: 'app-domain-admin',
  templateUrl: './domain-admin.component.html',
  styleUrls: ['./domain-admin.component.css']
})
export class DomainAdminComponent implements OnInit {

  isSuccessful = false;

  form: any = {
    domain: null,
    role: null
  };

  domains: any = [];

  constructor( private domainService: DomainService) { }

  ngOnInit(): void {
    this.retrieveDomains()
  }

  retrieveDomains() {
    this.domainService.getAllDomains().subscribe(response => {
      this.domains = response;
      console.log(this.domains)
    })
  }

  onSubmit(): void {
    console.log(this.form)
    const {domain, role} = this.form;
    this.domainService.createDomain(domain, role).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.retrieveDomains()

      }
    );

  }

  roleChanged(event: any) {
    this.form.role = event.target.value;
  }


}
