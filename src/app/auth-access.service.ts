import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessService {
  constructor() { }
  
  public isAuthorized(): boolean {
    const token = localStorage.getItem('jwtToken');
    // Perform a more robust check to see if the token is valid, not expired, etc.
    return !!token;
  }
}