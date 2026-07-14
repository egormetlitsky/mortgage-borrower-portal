import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'simulate', pathMatch: 'full' },
  {
    path: 'simulate',
    loadComponent: () => import('./pages/simulate/simulate.page').then((m) => m.SimulatePage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'apply',
    loadComponent: () => import('./pages/apply/apply.page').then((m) => m.ApplyPage),
    canActivate: [authGuard],
  },
  {
    path: 'upload/:applicationId',
    loadComponent: () => import('./pages/upload/upload.page').then((m) => m.UploadPage),
    canActivate: [authGuard],
  },
  {
    path: 'upload',
    loadComponent: () => import('./pages/upload/upload.page').then((m) => m.UploadPage),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'simulate' },
];
