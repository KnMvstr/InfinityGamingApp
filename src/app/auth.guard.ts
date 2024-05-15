import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    private authService: AuthService,
    private router: Router  // Inject Angular's Router
  ) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  )=> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirect to login page or any other route
      return false;
    }
    const  requiredRole = route.data['requiredRole'];
    if(requiredRole && !this.authService.userHasRole(requiredRole)){
      this.router.navigate(['/']); //Specify the fallback once the user is connected
      return false
    }
    return true;
  }
}