import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule, NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilesFoldersService } from '../../services/files-folders.service';

@Component({
  selector: 'app-move-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule
  ],
  template: `
    <div class="move-modal-container">
      <div class="tree-wrapper">
        <nz-tree
          [nzData]="nodes"
          nzShowIcon
          (nzClick)="onNodeClick($event)"
          [nzTreeTemplate]="nzTreeTemplate"
        >
          <ng-template #nzTreeTemplate let-node let-origin="origin">
            <span class="custom-node">
              <span nz-icon [nzType]="node.isExpanded ? 'folder-open' : 'folder'" nzTheme="fill" style="color: #ffca28"></span>
              <span class="folder-name">{{ node.title }}</span>
            </span>
          </ng-template>
        </nz-tree>
      </div>
      <div class="modal-footer">
        <button nz-button nzType="default" (click)="cancel()">Hủy</button>
        <button nz-button nzType="primary" (click)="submit()" [nzLoading]="loading" [disabled]="!selectedFolderId && selectedFolderId !== null">
          Chuyển đến đây
        </button>
      </div>
    </div>

    <style>
      .move-modal-container {
        padding: 10px;
      }
      .tree-wrapper {
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #f0f0f0;
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      .custom-node {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    </style>
  `
})
export class MoveModalComponent implements OnInit {
  @Input() itemId!: string;
  @Input() itemType!: 'file' | 'folder';
  @Input() itemName!: string;

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Tài liệu của tôi',
      key: 'root',
      expanded: true,
      icon: 'folder-open',
      children: []
    }
  ];

  selectedFolderId: string | null = null;
  loading = false;

  private filesFoldersService = inject(FilesFoldersService);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    this.loadTree();
  }

  async loadTree(): Promise<void> {
    try {
      const folders: any = await this.filesFoldersService.getFolderTree();
      this.nodes[0].children = this.mapFoldersToNodes(folders);
      this.nodes = [...this.nodes];
    } catch (error) {
      this.message.error('Lỗi khi tải danh sách thư mục');
    }
  }

  private mapFoldersToNodes(folders: any[]): NzTreeNodeOptions[] {
    return folders
      .filter(f => this.itemType === 'file' || f.id !== this.itemId) // Don't allow moving a folder into itself
      .map(f => ({
        title: f.name,
        key: f.id,
        isLeaf: !f.children || f.children.length === 0,
        children: f.children ? this.mapFoldersToNodes(f.children) : []
      }));
  }

  onNodeClick(event: NzFormatEmitEvent): void {
    if (event.node) {
      this.selectedFolderId = event.node.key === 'root' ? null : event.node.key;
    }
  }

  async submit() {
    this.loading = true;
    try {
      if (this.itemType === 'folder') {
        await this.filesFoldersService.moveFolder(this.itemId, this.selectedFolderId);
      } else {
        // moveFile requires a folderId (cannot be null based on API?)
        // Let's check API again. If root, maybe it's not supported for files?
        // Usually files can be in root.
        await this.filesFoldersService.moveFile(this.itemId, this.selectedFolderId as any);
      }
      this.message.success('Đã gửi yêu cầu di chuyển');
      this.filesFoldersService.notifyRefresh();
      this.modalRef.close(true);
    } catch (error) {
      this.message.error('Lỗi khi di chuyển');
    } finally {
      this.loading = false;
    }
  }

  cancel() {
    this.modalRef.close();
  }
}
