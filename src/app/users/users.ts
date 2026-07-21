import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { ReferralService } from '../referrals/referral.service';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html'
})
export class Users {
  private readonly userService = inject(UserService);
  private readonly referralService = inject(ReferralService);
  private readonly route = inject(ActivatedRoute);

  protected readonly error = signal<string | null>(null);
  protected readonly submitting = signal(false);
  protected readonly registered = signal(false);

  /** Referral code from the ?ref= link, and the resolved sponsor name. */
  protected readonly referralCode = signal<string | null>(null);
  protected readonly sponsorName = signal<string | null>(null);

  protected readonly form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    sponsorId: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit() {
    const ref = this.route.snapshot.queryParamMap.get('ref');
    if (!ref) {
      return;
    }

    this.referralCode.set(ref);
    this.referralService.lookup(ref).subscribe({
      next: (result) => this.sponsorName.set(result.sponsorName),
      error: () => this.referralCode.set(null) // unknown code — ignore it
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
        sponsorId: value.sponsorId ? value.sponsorId : null,
        referralCode: this.referralCode()
      })
      .subscribe({
        next: () => {
          this.form.reset();
          this.submitting.set(false);
          this.registered.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(typeof err.error === 'string' ? err.error : 'Registration failed.');
          this.submitting.set(false);
        }
      });
  }
}
