import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  isLoggedIn: boolean = false;
  userEmail: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserEmail().subscribe(email => {
      if (email) {
        this.isLoggedIn = true;
        this.userEmail = email;
      } else {
        this.isLoggedIn = false;
        this.userEmail = '';
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
