import { AppEditorComponent } from '@tot/shared';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-editor-test',
  standalone: true,
  imports: [CommonModule, FormsModule, AppEditorComponent, NzCardModule],
  template: `
    <div style="padding: 30px;">
      <nz-card nzTitle="Test Shared CKEditor Component">
        <app-editor [(ngModel)]="editorContent" placeholder="Thử nghiệm CKEditor..."></app-editor>

        <div class="mt-4">
          <h3>Kết quả HTML:</h3>
          <pre style="background: #f4f4f4; padding: 15px; border-radius: 4px; overflow-x: auto;">{{ editorContent }}</pre>
        </div>

        <div class="mt-4">
          <h3>Xem trước:</h3>
          <div [innerHTML]="editorContent" style="border: 1px solid #eee; padding: 15px; border-radius: 4px;"></div>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    .mt-4 { margin-top: 2rem; }
  `]
})
export class EditorTestComponent {
  editorContent = '<h2>Chào mừng bạn đến với TreeOfThought!</h2><p>Đây là nội dung thử nghiệm.</p>';
}
