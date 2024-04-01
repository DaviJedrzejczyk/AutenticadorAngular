import { Routes } from '@angular/router';

export const signRoute: Routes = [
  {
    path: '',
    title: 'Sign In page',
    loadComponent: () => import('./pages/sign/sign.component'),
  },
];
