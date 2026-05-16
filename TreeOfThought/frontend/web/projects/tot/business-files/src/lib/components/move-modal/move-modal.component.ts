import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule, NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TotButtonComponent } from '@tot/shared';
import { FilesFoldersService } from '../../services/files-folders.service';

@Component({
  selector: 'app-move-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule,
    TotButtonComponent
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
        <tot-button nzType="default" (click)="cancel()">Hủy</tot-button>
        <tot-button nzType="primary" (click)="submit()" [loading]="loading" [disabled]="!selectedFolderId && selectedFolderId !== null">
          Chuyển đến đây
        </tot-button>
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
  private modalData = inject(NZ_MODAL_DATA);
  itemId: string = this.modalData.itemId;
  itemType: 'file' | 'folder' = this.modalData.itemType;
  itemName: string = this.modalData.itemName;

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
      let result: any;
      if (this.itemType === 'folder') {
        result = await this.filesFoldersService.moveFolder(this.itemId, this.selectedFolderId);
      } else {
        result = await this.filesFoldersService.moveFile(this.itemId, this.selectedFolderId as any);
      }
      this.message.loading('Đang xử lý di chuyển...');
      this.modalRef.close({ trackingId: result.trackingId });
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
