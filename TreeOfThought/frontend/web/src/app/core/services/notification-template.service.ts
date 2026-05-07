import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateService {
  private templates: { [key: string]: TemplateRef<any> } = {};

  registerTemplate(name: string, template: TemplateRef<any>) {
    this.templates[name] = template;
  }

  getTemplate(name: string): TemplateRef<any> | undefined {
    return this.templates[name];
  }
}
