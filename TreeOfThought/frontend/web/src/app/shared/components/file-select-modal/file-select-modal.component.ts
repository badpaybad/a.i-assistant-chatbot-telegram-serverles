import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-file-select-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzListModule,
    NzIconModule,
    NzCheckboxModule
  ],
  template: `
    <div class="file-select-container">
      <nz-input-group [nzSuffix]="suffixIconSearch">
        <input type="text" nz-input placeholder="Tìm kiếm file..." [(ngModel)]="searchQuery" (ngModelChange)="onSearch($event)" />
      </nz-input-group>
      <ng-template #suffixIconSearch>
        <span nz-icon nzType="search"></span>
      </ng-template>

      <div class="file-list mt-3" style="max-height: 400px; overflow-y: auto;">
        <nz-list [nzDataSource]="files" [nzRenderItem]="item" [nzLoading]="loading">
          <ng-template #item let-file>
            <nz-list-item (click)="toggleSelect(file)" class="file-item" [style.cursor]="'pointer'">
              <div class="file-item-content d-flex align-items-center w-100">
                <label nz-checkbox [ngModel]="isSelected(file)" (click)="$event.stopPropagation()"></label>
                <nz-list-item-meta
                  [nzAvatar]="file.mimeType.startsWith('image/') ? file.url : null"
                  [nzTitle]="file.name"
                  [nzDescription]="file.mimeType"
                  class="ms-3"
                >
                  <ng-template #nzAvatar>
                    <span nz-icon [nzType]="getFileIcon(file.mimeType)" style="font-size: 24px;"></span>
                  </ng-template>
                </nz-list-item-meta>
              </div>
            </nz-list-item>
          </ng-template>
        </nz-list>
      </div>

      <div class="modal-footer-custom mt-3 d-flex justify-content-end">
        <button nz-button nzType="default" (click)="cancel()">Hủy</button>
        <button nz-button nzType="primary" [disabled]="selectedFiles.length === 0" (click)="insert()" class="ms-2">
          Chèn ({{ selectedFiles.length }})
        </button>
      </div>
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
export class FileSelectModalComponent implements OnInit {
  searchQuery = '';
  files: any[] = [];
  selectedFiles: any[] = [];
  loading = false;
  private searchSubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.loading = true;
        return this.http.get<any[]>(`/api/Files/search?query=${query}`);
      })
    ).subscribe({
      next: (res) => {
        this.files = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.onSearch('');
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  toggleSelect(file: any): void {
    const index = this.selectedFiles.findIndex(f => f.id === file.id);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(file);
    }
  }

  isSelected(file: any): boolean {
    return this.selectedFiles.some(f => f.id === file.id);
  }

  insert(): void {
    this.modal.destroy(this.selectedFiles);
  }

  cancel(): void {
    this.modal.destroy();
  }

  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'picture';
    if (mimeType.startsWith('video/')) return 'video-camera';
    if (mimeType.includes('pdf')) return 'file-pdf';
    if (mimeType.includes('word')) return 'file-word';
    if (mimeType.includes('excel')) return 'file-excel';
    return 'file';
  }
}
