import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

registerLocaleData(en);

const nzConfig: NzConfig = {
  notification: {
    nzPlacement: 'topRight',
    nzDuration: 15000 // 15 seconds
  }
};

const icons: IconDefinition[] = [
  AllIcons.UserOutline,
  AllIcons.LockOutline,
  AllIcons.GoogleOutline,
  AllIcons.WindowsOutline,
  AllIcons.FacebookOutline,
  AllIcons.DashboardOutline,
  AllIcons.ExperimentOutline,
  AllIcons.MenuFoldOutline,
  AllIcons.MenuUnfoldOutline,
  AllIcons.MailOutline,
  AllIcons.IdcardOutline,
  AllIcons.ReloadOutline,
  AllIcons.SearchOutline,
  AllIcons.WarningTwoTone,
  AllIcons.HomeOutline,
  AllIcons.InfoCircleOutline,
  AllIcons.PhoneOutline,
  AllIcons.RocketOutline,
  AllIcons.NotificationOutline,
  AllIcons.ClusterOutline,
  AllIcons.ArrowRightOutline,
  AllIcons.GlobalOutline,
  AllIcons.DownOutline,
  AllIcons.UpOutline,
  AllIcons.CopyOutline,
  AllIcons.DeleteOutline,
  AllIcons.RollbackOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    provideHttpClient(),
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
