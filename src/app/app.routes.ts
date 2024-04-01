import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/components/auth/auth.routes').then((e) => e.signRoute),
  },
  {
    path: 'admin',
    canActivateChild: [authGuardGuard],
    loadChildren: () =>
      import('./components/admin/admin.routes').then((e) => e.adminRoute),
  },
];
