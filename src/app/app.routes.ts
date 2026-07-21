import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Users } from './users/users';
import { Login } from './login/login';
import { Referrals } from './referrals/referrals';
import { Network } from './network/network';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Users },
  { path: 'login', component: Login },
  { path: 'referrals', component: Referrals, canActivate: [authGuard] },
  { path: 'network', component: Network, canActivate: [authGuard] }
];
