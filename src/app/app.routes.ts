import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./letter/letter.routes').then((m) => m.LetterRoutes),
  },
  {
    path: 'invitation',
    loadChildren: () => import('./jazmin-fest/jazmin-fest.routes').then((m) => m.jazminFestRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
