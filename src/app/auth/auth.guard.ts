import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../users/user.service';

/** Blocks a route unless the user is signed in; otherwise redirects to /login. */
export const authGuard: CanActivateFn = () => {
  const users = inject(UserService);
  const router = inject(Router);

  return users.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
