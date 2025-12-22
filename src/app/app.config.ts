import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions({
        // opcional: hook para debug/log
        onViewTransitionCreated: (vt) => {
          // vt.finished.then(() => console.log('VT finished'));
        },
      }),
      withComponentInputBinding()
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
