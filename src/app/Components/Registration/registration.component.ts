// registration.component.ts
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private userService: UserService, // Inject the UserService
    private zone: NgZone,
  ) {
    this.registrationForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(5)]],
      userType: ['GAMER']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const newUser = new User();
      newUser.pseudo = this.registrationForm.value.pseudo;
      newUser.email = this.registrationForm.value.email;
      newUser.pwd = this.registrationForm.value.pwd;
      newUser.userType = this.registrationForm.value.userType;

      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Automatically log in the user after successful registration
          this.authservice.login({ username: newUser.pseudo, password: newUser.pwd }).subscribe({
            next: (loginResponse) => {
              console.log('Login successful after registration', loginResponse);
              // Redirect the user to the desired page after successful login
              this.zone.run(() => {
                this.router.navigate(['/']);
              });
            },
            error: (loginError) => {
              console.error('Login after registration failed', loginError);
              // Handle login error if needed
            }
          });
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Set error message if registration fails
          this.zone.run(() => {
            this.error = 'Registration failed, please try again';
          });
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}