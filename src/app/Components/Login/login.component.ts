import { Component,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserLoginDTO } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: UserLoginDTO = { username: '', password: '' };
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) {}

  public showPassword: boolean = false;
  public showError: boolean= false;

  login() {
    this.error = '';// Clear any previous error
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful');
        this.router.navigate(['/users']); // Navigate to the homepage after successful login
      },
      error: (err) => {
        this.zone.run(() => {
          this.showError = true; // Show error
          this.error = 'Wrong username or password, please try again'; // Set the error message

          // Hide the error message after 3 seconds
          setTimeout(() => this.showError = false, 3000);
        });
        console.error(err);
      }
    });
  }

  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}