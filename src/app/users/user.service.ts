import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

import { AuthResponse, LoginRequest, RegisterRequest, User } from './user.model';

/** Base URL of the API. May be relative (dev proxy) or absolute (cross-origin, no proxy). */
export const API_BASE = environment.apiUrl;

const TOKEN_KEY = 'mlm.token';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  /** JWT for bearer auth. Persisted to localStorage so the session survives refreshes. */
  readonly token = signal<string | null>(this.readToken());
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.token() !== null);

  register(request: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${API_BASE}/register`, request);
  }

  login(request: LoginRequest): Observable<User> {
    return this.http
      .post<AuthResponse>(`${API_BASE}/login`, request)
      .pipe(map((res) => this.acceptAuth(res)));
  }

  loginWithGoogle(idToken: string, referralCode: string | null): Observable<User> {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/google`, { idToken, referralCode })
      .pipe(map((res) => this.acceptAuth(res)));
  }

  logout(): void {
    this.setToken(null);
    this.currentUser.set(null);
    this.http.post(`${API_BASE}/logout`, {}).subscribe({ error: () => {} });
  }

  /** Restore the session from the stored token. Called once at app start (browser only). */
  loadMe(): Observable<User | null> {
    if (!this.token()) {
      this.currentUser.set(null);
      return of(null);
    }

    return this.http.get<User>(`${API_BASE}/me`).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        // Token invalid/expired — clear it.
        this.setToken(null);
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  private acceptAuth(res: AuthResponse): User {
    this.setToken(res.token);
    this.currentUser.set(res.user);
    return res.user;
  }

  private setToken(token: string | null): void {
    this.token.set(token);
    if (typeof localStorage === 'undefined') {
      return;
    }
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  private readToken(): string | null {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY);
  }
}
