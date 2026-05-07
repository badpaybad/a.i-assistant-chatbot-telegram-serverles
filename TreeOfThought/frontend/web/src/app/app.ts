import { Component, TemplateRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationTemplateService } from './core/services/notification-template.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('htmlNotification') htmlNotificationTemplate!: TemplateRef<any>;
  private templateService = inject(NotificationTemplateService);

  ngAfterViewInit() {
    this.templateService.registerTemplate('html', this.htmlNotificationTemplate);
  }
}
