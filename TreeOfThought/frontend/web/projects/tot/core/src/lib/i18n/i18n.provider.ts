import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export interface TotI18nConfig {
  prodMode: boolean;
  availableLangs?: string[];
  defaultLang?: string;
}

export function provideTotI18n(config: TotI18nConfig) {
  return provideTransloco({
    config: {
      availableLangs: config.availableLangs || ['en', 'vi'],
      defaultLang: config.defaultLang || 'vi',
      reRenderOnLangChange: true,
      prodMode: config.prodMode,
    },
    loader: TranslocoHttpLoader
  });
}
