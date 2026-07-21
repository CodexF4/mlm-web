import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../users/user.service';
import { GoogleSignin } from '../auth/google-signin';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, GoogleSignin],
  templateUrl: './login.html'
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);
  protected readonly submitting = signal(false);

  protected readonly form = new FormGroup({
    usernameOrEmail: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.userService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.error.set('Invalid username/email or password.');
        this.submitting.set(false);
      }
    });
  }

  protected onGoogle(idToken: string) {
    this.error.set(null);
    this.userService.loginWithGoogle(idToken, null).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err: HttpErrorResponse) =>
        this.error.set(typeof err.error === 'string' ? err.error : 'Google sign-in failed.')
    });
  }
}
