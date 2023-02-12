import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showMySubject = false;
  showAdmin = false;
  firstName?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('SUPERVISOR');
      this.showModeratorBoard = this.roles.includes('STUDENT');
      this.showAdmin = this.roles.includes('ADMIN');
      this.showMySubject = this.roles.includes('STUDENT_ACCEPTED_IN_GROUP');

      this.firstName = user.firstName;

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
