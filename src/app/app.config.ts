import {
  ApplicationConfig,
  PLATFORM_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { tokenInterceptor } from './auth/token.interceptor';
import {
  provideClientHydration,
  withEventReplay,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { UserService } from './users/user.service';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withNoIncrementalHydration()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    // Restore the session from the stored bearer token before the app renders (browser only).
    provideAppInitializer(() => {
      if (!isPlatformBrowser(inject(PLATFORM_ID))) {
        return;
      }
      return firstValueFrom(inject(UserService).loadMe());
    }),
    provideIonicAngular({}),
  ],
};
