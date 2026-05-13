import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

/**
 * Patch fetch to handle Wiris MathType Telemeter WASM loading in Vite/Angular dev server.
 * The library tries to load the WASM relatively from the bundled JS in the Vite cache, which fails (404).
 * We redirect it to the correctly served asset path.
 */
const originalFetch = window.fetch;
window.fetch = function (input, init) {
  const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : input.toString());
  if (url.includes('telemeter_wasm_bg.wasm')) {
    return originalFetch('/assets/telemeter_wasm_bg.wasm', init);
  }
  return originalFetch(input, init);
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
