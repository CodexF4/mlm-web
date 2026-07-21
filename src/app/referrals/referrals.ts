import { Component, inject, signal } from '@angular/core';

import { ReferralService } from './referral.service';
import { Downline, MyReferral, ReferralNode } from './referral.model';

@Component({
  selector: 'app-referrals',
  imports: [],
  templateUrl: './referrals.html'
})
export class Referrals {
  private readonly referralService = inject(ReferralService);

  protected readonly myReferral = signal<MyReferral | null>(null);
  protected readonly direct = signal<ReferralNode[]>([]);
  protected readonly downline = signal<Downline | null>(null);
  protected readonly copied = signal(false);

  ngOnInit() {
    this.referralService.myReferral().subscribe((r) => this.myReferral.set(r));
    this.referralService.directReferrals().subscribe((r) => this.direct.set(r));
    this.referralService.downline().subscribe((d) => this.downline.set(d));
  }

  protected link(): string {
    const code = this.myReferral()?.code;
    if (!code || typeof window === 'undefined') {
      return '';
    }
    return `${window.location.origin}/register?ref=${code}`;
  }

  protected copy() {
    const link = this.link();
    if (link && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => this.copied.set(true));
    }
  }
}
