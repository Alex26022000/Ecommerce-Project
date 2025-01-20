import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        if (response && response.message === 'Login successful!') {
          this.authService.setUserEmail(this.email);  
          this.router.navigate(['/products']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'An error occurred during login';
      }
    });
  }
}
