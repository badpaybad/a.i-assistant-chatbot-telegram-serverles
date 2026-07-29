import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tot-elsa-studio-wrapper',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="relative min-h-screen bg-slate-900 text-white flex flex-col">
      <!-- Top Info Banner -->
      <div class="p-4 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-semibold text-white">Official Elsa Studio UI (Web Component Host)</span>
          <span class="text-slate-500 font-mono">| server-url: {{ serverUrl }}</span>
        </div>
        <span class="px-2 py-0.5 bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded text-[11px] font-mono">
          @elsa-workflows/elsa-workflows-studio v2.14
        </span>
      </div>

      <!-- Web Component Container -->
      <div class="flex-1 w-full min-h-[780px] bg-white text-slate-900 rounded-b-xl overflow-hidden shadow-2xl">
        <elsa-studio-root 
          [attr.server-url]="serverUrl"
          [attr.monaco-lib-path]="monacoPath"
          class="w-full h-full block min-h-[780px]"
        >
        </elsa-studio-root>
      </div>
    </div>
  `
})
export class ElsaStudioWrapperComponent implements OnInit {
  @Input() serverUrl: string = '/api/workflow';
  @Input() monacoPath: string = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs';

  ngOnInit(): void {
    this.loadElsaStudioResources();
  }

  private loadElsaStudioResources(): void {
    // 1. Inject Stylesheet
    const styleId = 'elsa-studio-css';
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = '/assets/elsa-workflows-studio/elsa-workflows-studio.css';
      link.onerror = () => {
        const cdnLink = document.createElement('link');
        cdnLink.rel = 'stylesheet';
        cdnLink.href = 'https://cdn.jsdelivr.net/npm/@elsa-workflows/elsa-workflows-studio@2.14.0/dist/elsa-workflows-studio/elsa-workflows-studio.css';
        document.head.appendChild(cdnLink);
      };
      document.head.appendChild(link);
    }

    // 2. Inject ESM Module Script
    const scriptId = 'elsa-studio-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = '/assets/elsa-workflows-studio/elsa-workflows-studio.esm.js';
      script.onerror = () => {
        const cdnScript = document.createElement('script');
        cdnScript.type = 'module';
        cdnScript.src = 'https://cdn.jsdelivr.net/npm/@elsa-workflows/elsa-workflows-studio@2.14.0/dist/elsa-workflows-studio/elsa-workflows-studio.esm.js';
        document.head.appendChild(cdnScript);
      };
      document.head.appendChild(script);
    }
  }
}
