import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { LoginRequest, RegisterRequest, User } from './user.model';

/** Same-origin API prefix, proxied to the .NET API in dev (see proxy.config.json). */
export const API_BASE = '/api';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  /**
   * The signed-in user, or null. Not persisted client-side — the JWT lives in an
   * httpOnly cookie, so we restore the session by calling /me at app start.
   */
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  register(request: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${API_BASE}/register`, request);
  }

  login(request: LoginRequest): Observable<User> {
    return this.http
      .post<User>(`${API_BASE}/login`, request)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): void {
    this.currentUser.set(null);
    this.http.post(`${API_BASE}/logout`, {}).subscribe({ error: () => {} });
  }

  /** Restore the session from the auth cookie. Called once at app start (browser only). */
  loadMe(): Observable<User | null> {
    return this.http.get<User>(`${API_BASE}/me`).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }
}
