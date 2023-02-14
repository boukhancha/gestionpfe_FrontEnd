import { Component, OnInit } from '@angular/core';
import {DomainService} from "../_services/domain.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-domain-admin',
  templateUrl: './domain-admin.component.html',
  styleUrls: ['./domain-admin.component.css']
})
export class DomainAdminComponent implements OnInit {

  form: any = {
    domain: null,
    role: null
  };

  domains: any = [];
  isSuccessful: boolean = false;

  constructor( private domainService: DomainService,
               private toastrService :ToastrService) { }

  ngOnInit(): void {
    this.retrieveDomains()
  }

  retrieveDomains() {
    this.domainService.getAllDomains().subscribe(response => {
      this.domains = response;
    }, _ => {
      this.toastrService.error("couldn't fetch domains");
    })
  }

  onSubmit(): void {
    console.log(this.form)
    this.isSuccessful = true;
    const {domain, role} = this.form;
    this.domainService.createDomain(domain, role).subscribe(
      _ => {
        this.toastrService.success("domain has been created.");
        this.retrieveDomains()
      }, _ => {
        this.toastrService.error("domain has not been created.");
      }
    );

  }

  roleChanged(event: any) {
    this.form.role = event.target.value;
  }

}
