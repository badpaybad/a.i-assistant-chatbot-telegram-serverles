import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TotButtonComponent } from '@tot/shared';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-file-detail-modal',
  standalone: true,
  imports: [
    CommonModule, 
    NzIconModule, 
    NzButtonModule, 
    NzTagModule, 
    NzTooltipModule, 
    NzDividerModule, 
    NzInputModule, 
    FormsModule,
    TotButtonComponent
  ],
  templateUrl: './file-detail-modal.component.html',
  styleUrl: './file-detail-modal.component.css'
})
export class FileDetailModalComponent implements OnInit {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  private modalRef = inject(NzModalRef);
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);
  private message = inject(NzMessageService);

  file = this.nzModalData.file;
  previewType: 'image' | 'pdf' | 'text' | 'video' | 'audio' | 'none' = 'none';
  safeUrl?: SafeResourceUrl;
  textContent = '';

  ngOnInit(): void {
    this.determinePreviewType();
  }

  determinePreviewType(): void {
    const mime = this.file.mimeType.toLowerCase();
    if (mime.startsWith('image/')) {
      this.previewType = 'image';
    } else if (mime === 'application/pdf') {
      this.previewType = 'pdf';
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.file.url);
    } else if (mime.startsWith('text/') || mime === 'application/json' || mime === 'application/javascript') {
      this.previewType = 'text';
      this.loadTextContent();
    } else if (mime.startsWith('video/')) {
      this.previewType = 'video';
    } else if (mime.startsWith('audio/')) {
      this.previewType = 'audio';
    } else {
      this.previewType = 'none';
    }
  }

  loadTextContent(): void {
    this.http.get(this.file.url, { responseType: 'text' }).subscribe({
      next: (content) => this.textContent = content,
      error: () => this.textContent = 'Không thể tải nội dung xem trước.'
    });
  }

  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'picture';
    if (mimeType === 'application/pdf') return 'file-pdf';
    if (mimeType.startsWith('video/')) return 'video-camera';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'file-zip';
    return 'file';
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getPermissionLabel(permission: any): string {
    const p = String(permission);
    switch (p) {
      case '0':
      case 'Private': return 'Riêng tư';
      case '1':
      case 'Public': return 'Công khai';
      case '2':
      case 'Shared': return 'Được chia sẻ';
      default: return 'Không xác định';
    }
  }

  getPermissionColor(permission: any): string {
    const p = String(permission);
    switch (p) {
      case '0':
      case 'Private': return 'default';
      case '1':
      case 'Public': return 'success';
      case '2':
      case 'Shared': return 'processing';
      default: return 'default';
    }
  }

  copyLink(url: string): void {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      this.message.success('Đã sao chép đường dẫn');
    });
  }

  download(): void {
    window.open(this.file.url, '_blank');
  }

  close(): void {
    this.modalRef.close();
  }
}
