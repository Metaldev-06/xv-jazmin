import { Routes } from '@angular/router';
import { JazminFest } from './jazmin-fest';

export const jazminFestRoutes: Routes = [
  {
    path: '',
    component: JazminFest,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
    ],
  },
];
