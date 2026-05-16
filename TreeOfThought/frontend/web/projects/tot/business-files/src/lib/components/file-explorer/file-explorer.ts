import { Component, Input, OnChanges, SimpleChanges, inject, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FilesFoldersService } from '../../services/files-folders.service';
import { MessageBusService, EVENT_TOPICS, FirebaseService } from '@tot/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '@tot/shared';
import { FileShareModalComponent } from '../file-share-modal/file-share-modal.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CreateFolderPopoverComponent } from '../create-folder-popover/create-folder-popover.component';
import { MoveModalComponent } from '../move-modal/move-modal.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Subscription } from 'rxjs';
import { FileDetailModalComponent } from '../file-detail-modal/file-detail-modal.component';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzTooltipModule,
    NzTagModule,
    NzModalModule,
    NzBreadCrumbModule,
    FormsModule,
    NzInputModule,
    NzPopoverModule,
    CreateFolderPopoverComponent,
    NzCollapseModule,
    AppButtonComponent
  ],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.css',
})
export class FileExplorerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedFolderId: string | null = null;
  @Input() selectionMode = false;
  @Output() folderCreated = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<any>();

  private filesFoldersService = inject(FilesFoldersService);
  private firebaseService = inject(FirebaseService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private messageBus = inject(MessageBusService);

  folders: any[] = [];
  files: any[] = [];
  loading = false;
  loadingUpload = false;
  loadingRefresh = false;

  pageIndex = 1;
  pageSize = 10;
  total = 0;
  breadcrumbs: any[] = [];
  
  get currentFolderName(): string {
    if (this.breadcrumbs && this.breadcrumbs.length > 0) {
      return this.breadcrumbs[this.breadcrumbs.length - 1].name;
    }
    return 'Tài liệu của tôi';
  }
  
  createPopoverVisible = false;
  newFolderName = '';
  creatingFolder = false;

  // Search properties
  searchQuery = '';
  searchResults: any[] = [];
  searching = false;
  searchExpanded = false;
  searchPageIndex = 1;
  searchPageSize = 5;

  private refreshSub?: Subscription;

  ngOnInit(): void {
    this.refreshSub = this.filesFoldersService.refresh$.subscribe(() => {
      this.loadContent();
    });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFolderId']) {
      this.pageIndex = 1;
      this.loadContent();
    }
  }

  async loadContent(isRefresh = false): Promise<void> {
    if (isRefresh) this.loadingRefresh = true;
    else this.loading = true;
    try {
      const response: any = await this.filesFoldersService.getFolderContent(this.selectedFolderId, this.pageIndex, this.pageSize);
      this.folders = response.folders || [];
      this.files = response.files || [];
      this.total = response.totalFiles || 0;
      this.breadcrumbs = response.breadcrumbs || [];
    } catch (error) {
      this.message.error('Lỗi khi tải nội dung thư mục');
    } finally {
      this.loading = false;
      this.loadingRefresh = false;
    }
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadContent();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.loadContent();
  }

  navigateToFolder(folderId: string | null): void {
    this.selectedFolderId = folderId;
    this.loadContent();
  }

  async onUpload(event: any): Promise<void> {
    const file = event.target.files[0];
    if (!file) return;

    try {
      this.loadingUpload = true;
      const result: any = await this.filesFoldersService.uploadFile(this.selectedFolderId, file);
      this.message.loading('Đang xử lý upload file...');
      this.waitForTask(result.trackingId, 'File đã được upload thành công');
    } catch (error) {
      this.message.error('Lỗi khi upload file');
    } finally {
      this.loadingUpload = false;
    }
  }

  openShareModal(file: any): void {
    const modal = this.modal.create({
      nzTitle: `Chia sẻ file: ${file.name}`,
      nzContent: FileShareModalComponent,
      nzData: { file },
      nzFooter: null
    });

    modal.afterClose.subscribe((result: any) => {
      if (result && result.trackingId) {
        this.waitForTask(result.trackingId, 'Quyền truy cập đã được cập nhật');
      }
    });
  }

  async deleteFile(fileId: string): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa file này?',
      nzOnOk: async () => {
        try {
          const result: any = await this.filesFoldersService.deleteFile(fileId);
          this.message.loading('Đang xử lý xóa file...');
          this.waitForTask(result.trackingId, 'File đã được xóa thành công');
        } catch (error) {
          this.message.error('Lỗi khi xóa file');
        }
      }
    });
  }

  openMoveModal(item: any, type: 'file' | 'folder'): void {
    const modal = this.modal.create({
      nzTitle: `Chuyển ${type === 'file' ? 'file' : 'thư mục'}: ${item.name}`,
      nzContent: MoveModalComponent,
      nzData: {
        itemId: item.id,
        itemType: type,
        itemName: item.name
      },
      nzFooter: null
    });

    modal.afterClose.subscribe((result: any) => {
      if (result && result.trackingId) {
        this.waitForTask(result.trackingId, 'Đã di chuyển thành công');
      }
    });
  }

  async deleteFolder(folderId: string): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa thư mục này và toàn bộ nội dung bên trong?',
      nzOnOk: async () => {
        try {
          const result: any = await this.filesFoldersService.deleteFolder(folderId);
          this.message.loading('Đang xử lý xóa thư mục...');
          this.waitForTask(result.trackingId, 'Thư mục đã được xóa thành công');
        } catch (error) {
          this.message.error('Lỗi khi xóa thư mục');
        }
      }
    });
  }

  private waitForTask(trackingId: string, successMessage: string): void {
    if (!trackingId) {
      this.loadContent();
      return;
    }

    const sub = this.firebaseService.subscribeToRequestId(trackingId, (data) => {
      if (data.status === 'Completed') {
        this.message.success(data.message || successMessage);
        this.loadContent();
        this.folderCreated.emit(); // To refresh folder tree
        sub(); // Unsubscribe
      } else if (data.status === 'Error') {
        this.message.error(data.message || 'Thao tác thất bại');
        this.loadContent();
        sub(); // Unsubscribe
      }
    });
  }

  async onSearch(): Promise<void> {
    if (!this.searchQuery || !this.searchQuery.trim()) {
      this.searchResults = [];
      this.searchExpanded = false;
      return;
    }

    this.searching = true;
    try {
      const results: any = await this.filesFoldersService.searchFiles(this.searchQuery);
      this.searchResults = results || [];
      this.searchExpanded = this.searchResults.length > 0;
      this.searchPageIndex = 1;
      if (this.searchResults.length === 0) {
        this.message.info('Không tìm thấy file nào');
      }
    } catch (error) {
      this.message.error('Lỗi khi tìm kiếm file');
    } finally {
      this.searching = false;
    }
  }

  goToFolder(folderId: string | null): void {
    this.filesFoldersService.notifySelectFolder(folderId);
    // Keep searchExpanded = true as requested by user
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.searchExpanded = false;
  }

  onSelectFile(file: any): void {
    this.fileSelected.emit(file);
    this.messageBus.publish(EVENT_TOPICS.FILE_SELECTED, file);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  openFileDetail(file: any): void {
    this.modal.create({
      nzTitle: `Chi tiết file: ${file.name}`,
      nzContent: FileDetailModalComponent,
      nzData: { file },
      nzFooter: null,
      nzWidth: 800
    });
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
}
