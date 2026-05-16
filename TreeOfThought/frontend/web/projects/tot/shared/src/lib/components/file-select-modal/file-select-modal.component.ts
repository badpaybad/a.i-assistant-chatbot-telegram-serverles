import { Component, inject, OnInit, Type, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentRegistryService, MessageBusService, REGISTRY_KEYS, EVENT_TOPICS } from '@tot/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-select-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule
  ],
  template: `
    <div class="file-select-modal-container">
      <ng-container *ngIf="filesFoldersComponent; else noComponent">
        <ng-container *ngComponentOutlet="filesFoldersComponent; inputs: { selectionMode: true }"></ng-container>
      </ng-container>
      <ng-template #noComponent>
        <div style="padding: 20px; text-align: center;">
          <p>Component "{{ registryKey }}" chưa được đăng ký trong Registry.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .file-select-modal-container {
      min-height: 400px;
    }
  `]
})
export class FileSelectModalComponent implements OnInit, OnDestroy {
  private modal = inject(NzModalRef);
  private registry = inject(ComponentRegistryService);
  private messageBus = inject(MessageBusService);
  
  filesFoldersComponent?: Type<any>;
  readonly registryKey = REGISTRY_KEYS.FILES_FOLDERS;
  private sub = new Subscription();

  ngOnInit() {
    this.filesFoldersComponent = this.registry.get(this.registryKey);
    
    this.sub.add(
      this.messageBus.on(EVENT_TOPICS.FILE_SELECTED).subscribe((file: any) => {
        this.onFileSelected(file);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFileSelected(file: any): void {
    this.modal.destroy([file]);
  }

  cancel(): void {
    this.modal.destroy();
  }
}
