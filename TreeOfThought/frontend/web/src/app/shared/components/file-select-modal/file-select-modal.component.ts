import { Component } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FilesFolders } from '../../../modules/files-folders/components/files-folders/files-folders';

@Component({
  selector: 'app-file-select-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule,
    FilesFolders
  ],
  template: `
    <div class="file-select-modal-container">
      <app-files-folders [selectionMode]="true" (fileSelected)="onFileSelected($event)"></app-files-folders>
    </div>
  `,
  styles: [`
    .file-item:hover {
      background-color: #f5f5f5;
    }
    .file-item-content { display: flex; align-items: center; }
    .mt-3 { margin-top: 1rem; }
    .ms-2 { margin-left: 0.5rem; }
    .ms-3 { margin-left: 1rem; }
    .w-100 { width: 100%; }
  `]
})
export class FileSelectModalComponent {
  constructor(
    private modal: NzModalRef
  ) {}

  onFileSelected(file: any): void {
    this.modal.destroy([file]);
  }

  cancel(): void {
    this.modal.destroy();
  }
}
