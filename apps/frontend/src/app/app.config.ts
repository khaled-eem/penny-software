import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),

    provideStore({ auth: authReducer }),
    importProvidersFrom(EffectsModule.forRoot([AuthEffects])),
  ],
};



//provideEffects([AuthEffects]),