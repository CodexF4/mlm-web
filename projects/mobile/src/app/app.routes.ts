import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'for-you', pathMatch: 'full' },
      {
        path: 'for-you',
        loadComponent: () => import('./for-you/for-you').then((m) => m.ForYouPage),
      },
      {
        path: 'mall',
        loadComponent: () => import('./mall/mall').then((m) => m.MallPage),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications').then((m) => m.NotificationsPage),
      },
      {
        path: 'you',
        loadComponent: () => import('./you/you').then((m) => m.YouPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/for-you',
    pathMatch: 'full',
  },
];
