import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  searchTerms = new Subject<string>();
  results: any[] = [];
  title = 'angular-infinitygaming-app';

  constructor(public authService: AuthService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  userHasAnyRequiredRole(roles: string[]): boolean {
    // Check if the user has at least one of the roles required
    return roles.some(role => this.authService.userHasRole(role));
  }

  logout() {
    this.authService.logout();
   // Navigate to home or login as appropriate
  }
}