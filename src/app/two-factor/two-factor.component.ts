import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent {
  code: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  verifyCode() {
    this.authService.verifyTwoFactorCode(this.code).subscribe(
      response => {
        this.authService.twoFactorAuthenticated.next(true);
        this.router.navigate(['/']);
      },
      error => {
        console.error('2FA verification failed', error);
      }
    );
  }
}
