import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { API_BASE, UserService } from '../users/user.service';

/** Attaches the JWT as a Bearer header to API requests when the user is signed in. */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(UserService).token();

  if (token && req.url.startsWith(API_BASE)) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};
