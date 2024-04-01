import { Routes } from '@angular/router';

export const adminRoute: Routes = [
  {
    path: '',
    title: 'Home page',
    loadComponent: () => import('./pages/home/home.component'),
  },
];
