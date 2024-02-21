import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {PRECONNECT_CHECK_BLOCKLIST} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://gzc-labs.com'}
  ]
};
