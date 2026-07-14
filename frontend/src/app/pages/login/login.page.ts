import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { extractErrorMessage } from '../../core/error-utils';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.page.html',
})
export class LoginPage {
  email = '';
  password = '';
  readonly error = signal<string | null>(null);

  constructor(
    private readonly api: ApiService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  submit(): void {
    this.error.set(null);
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.access_token);
        this.router.navigateByUrl('/apply');
      },
      error: (err) => this.error.set(extractErrorMessage(err, 'Login failed.')),
    });
  }
}
