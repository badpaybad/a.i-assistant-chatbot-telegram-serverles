import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

import { environment } from '../environments/environment';
import { authInterceptor, errorInterceptor, API_URL, FIREBASE_CONFIG } from '@tot/core';

registerLocaleData(en);

const nzConfig: NzConfig = {
  notification: {
    nzPlacement: 'topRight',
    nzDuration: 0
  }
};

const icons: IconDefinition[] = Object.keys(AllIcons).map(key => (AllIcons as any)[key]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    { provide: API_URL, useValue: environment.apiBaseUrl },
    { provide: FIREBASE_CONFIG, useValue: environment.firebase },
    provideTranslateService({
      fallbackLang: 'vi'
    }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    }),
    { provide: NZ_CONFIG, useValue: nzConfig },
    importProvidersFrom(
      FormsModule, 
      NzIconModule.forRoot(icons)
    )
  ]
};
