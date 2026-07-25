import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

import { UserService } from './user.service';
import { ReferralService } from '../referrals/referral.service';
import { GoogleSignin } from '../auth/google-signin';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, RouterLink, GoogleSignin],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './users.html',
})
export class Users {
  private readonly userService = inject(UserService);
  private readonly referralService = inject(ReferralService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);
  protected readonly submitting = signal(false);
  protected readonly registered = signal(false);

  /** Resolved sponsor name for the entered/linked referral code. */
  protected readonly sponsorName = signal<string | null>(null);

  protected readonly form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    referralCode: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    // Resolve the sponsor name as the code changes (typed or from a ?ref= link).
    this.form.controls.referralCode.valueChanges
      .pipe(debounceTime(300))
      .subscribe((code) => this.lookupSponsor(code));

    const ref = this.route.snapshot.queryParamMap.get('ref');
    if (ref) {
      this.form.controls.referralCode.setValue(ref);
    }
  }

  private lookupSponsor(code: string) {
    const trimmed = code.trim();
    if (!trimmed) {
      this.sponsorName.set(null);
      return;
    }

    this.referralService.lookup(trimmed).subscribe({
      next: (result) => this.sponsorName.set(result.sponsorName),
      error: () => this.sponsorName.set(null), // unknown code — no sponsor shown
    });
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitting.set(true);
    this.error.set(null);

    this.userService
      .register({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        username: value.username,
        password: value.password,
        referralCode: value.referralCode.trim() ? value.referralCode.trim() : null,
      })
      .subscribe({
        next: () => {
          this.form.reset();
          this.sponsorName.set(null);
          this.submitting.set(false);
          this.registered.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(typeof err.error === 'string' ? err.error : 'Registration failed.');
          this.submitting.set(false);
        },
      });
  }

  protected onGoogle(idToken: string) {
    this.error.set(null);
    const code = this.form.controls.referralCode.value.trim();
    this.userService.loginWithGoogle(idToken, code ? code : null).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err: HttpErrorResponse) =>
        this.error.set(typeof err.error === 'string' ? err.error : 'Google sign-in failed.'),
    });
  }
}
