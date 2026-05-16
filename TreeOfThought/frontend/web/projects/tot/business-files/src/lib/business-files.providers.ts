import { APP_INITIALIZER, Provider } from '@angular/core';
import { ComponentRegistryService, REGISTRY_KEYS } from '@tot/core';
import { FilesFolders } from './components/files-folders/files-folders';

export function provideBusinessFiles(): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (registry: ComponentRegistryService) => () => {
        registry.register(REGISTRY_KEYS.FILES_FOLDERS, FilesFolders);
      },
      deps: [ComponentRegistryService],
      multi: true
    }
  ];
}
