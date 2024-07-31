import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private twoFactorAuthenticated = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isTwoFactorAuthenticated() {
    return this.twoFactorAuthenticated.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>('/api/login', { username, password });
  }

  verifyTwoFactorCode(code: string) {
    return this.http.post<any>('/api/verify-2fa', { code });
  }

  logout() {
    this.loggedIn.next(false);
    this.twoFactorAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
}
