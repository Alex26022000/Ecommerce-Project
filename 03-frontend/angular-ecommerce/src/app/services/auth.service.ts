import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


interface LoginResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth/login';  
  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password });
  }

  setUserEmail(email: string) {
    localStorage.setItem('userEmail', email);
    this.userSubject.next(email);
  }

  getUserEmail() {
    return this.userSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.userSubject.next(null);
  }
  
}