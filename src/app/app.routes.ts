import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Users } from './users/users';
import { Login } from './login/login';
import { Referrals } from './referrals/referrals';
import { Network } from './network/network';
import { Community } from './community/community';
import { Earn } from './earn/earn';
import { Cart } from './cart/cart';
import { Search } from './search/search';
import { InDevelopment } from './in-development/in-development';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'community', component: Community },
  { path: 'earn', component: Earn },
  { path: 'cart', component: Cart },
  { path: 'search', component: Search },
  { path: 'register', component: Users },
  { path: 'login', component: Login },
  { path: 'referrals', component: Referrals, canActivate: [authGuard] },
  { path: 'network', component: Network, canActivate: [authGuard] },
  // Any URL without a dedicated page shows the in-development placeholder.
  { path: '**', component: InDevelopment }
];
