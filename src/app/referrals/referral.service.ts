import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE } from '../users/user.service';
import { Downline, MyReferral, ReferralLookup, ReferralNode } from './referral.model';

@Injectable({ providedIn: 'root' })
export class ReferralService {
  private readonly http = inject(HttpClient);

  /** Public: resolve a referral code to the sponsor's name. */
  lookup(code: string): Observable<ReferralLookup> {
    return this.http.get<ReferralLookup>(`${API_BASE}/referral/${encodeURIComponent(code)}`);
  }

  myReferral(): Observable<MyReferral> {
    return this.http.get<MyReferral>(`${API_BASE}/me/referral`);
  }

  directReferrals(): Observable<ReferralNode[]> {
    return this.http.get<ReferralNode[]>(`${API_BASE}/me/referrals`);
  }

  downline(): Observable<Downline> {
    return this.http.get<Downline>(`${API_BASE}/me/downline`);
  }
}
