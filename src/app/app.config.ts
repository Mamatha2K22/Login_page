import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { authInterceptor } from './Pages/auth-interceptor';
import { loggingInterceptor } from './Pages/logging-interceptor';
import { errorInterceptor } from './Pages/error-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    BrowserAnimationsModule,
    provideAnimationsAsync(),
      providePrimeNG({
          theme: {
              preset: Aura
          }
      }),
    provideHttpClient(withInterceptors([authInterceptor,loggingInterceptor,errorInterceptor])),
    
  ]
};
