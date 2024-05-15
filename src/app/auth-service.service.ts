import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

export interface UserLoginDTO {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService { //authentication service must check both login status and roles
  private authUrl = 'http://localhost:8080/auth'; // URL to web API
  private currentUserRoles: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }
  
  login(credentials: UserLoginDTO): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        const decodedToken = jwtDecode<any>(response.token) as any; // Decode the token to get the roles
        const roles = decodedToken.role as string[]; // 'role' match the token claim in JwtTokenUtil. Data in token have been tested using https://jwt.io/ 
        this.storeUserRoles(roles);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');  // Clear stored roles
    this.currentUserRoles = [];  // Reset the roles in memory
    this.router.navigate(['/']); 
  }

  storeUserRoles(roles: string[]): void {
    this.currentUserRoles = roles; // Store the user role
    localStorage.setItem('roles', JSON.stringify(roles)); // Sync roles with local storage
  }

  userHasRole(role: string): boolean {
    console.log('Current Roles:', this.currentUserRoles);
    this.loadUserRoles();  // Ensure roles are loaded from local storage
    return this.currentUserRoles.includes(role);
  }

  // This method loads the user roles from local storage
  private loadUserRoles(): void {
    try {
      const roles = localStorage.getItem('roles');
      if (roles) {
        this.currentUserRoles = JSON.parse(roles);
      } else {
        this.currentUserRoles = []; // Fallback to an empty array if nothing in storage
      }
    } catch (error) {
      console.error('Error loading user roles:', error);
      this.currentUserRoles = []; // Fallback to an empty array on error
    }
  }

  // Helper method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  // Method to get stored token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}