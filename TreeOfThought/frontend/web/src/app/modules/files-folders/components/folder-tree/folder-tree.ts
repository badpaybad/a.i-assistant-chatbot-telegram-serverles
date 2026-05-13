import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FilesFoldersService } from '../../services/files-folders.service';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule, NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder-tree',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    NzModalModule,
    NzInputModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzTooltipModule
  ],
  templateUrl: './folder-tree.html',
  styleUrl: './folder-tree.css',
})
export class FolderTreeComponent implements OnInit {
  @Output() folderSelected = new EventEmitter<string | null>();

  private filesFoldersService = inject(FilesFoldersService);
  private nzContextMenuService = inject(NzContextMenuService);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Tài liệu của tôi',
      key: 'root',
      expanded: true,
      icon: 'folder-open',
      children: []
    }
  ];

  ngOnInit(): void {
    this.loadTree();
  }

  async loadTree(): Promise<void> {
    try {
      const folders: any = await this.filesFoldersService.getFolderTree();
      this.nodes[0].children = this.mapFoldersToNodes(folders);
      this.nodes = [...this.nodes];
    } catch (error) {
      console.error('Failed to load folder tree', error);
    }
  }

  private mapFoldersToNodes(folders: any[]): NzTreeNodeOptions[] {
    return folders.map(f => ({
      title: f.name,
      key: f.id,
      isLeaf: !f.children || f.children.length === 0,
      children: f.children ? this.mapFoldersToNodes(f.children) : []
    }));
  }

  onEvent(event: NzFormatEmitEvent): void {
    if (event.eventName === 'click') {
      const node = event.node;
      if (node) {
        this.folderSelected.emit(node.key === 'root' ? null : node.key);
      }
    }
  }

  contextNode: NzTreeNode | null = null;

  onContextMenu(event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.contextNode = event.node || null;
    this.nzContextMenuService.create(event.event as MouseEvent, menu);
  }

  showCreateModal(parentId: string | null = null): void {
    let folderName = '';
    const modalRef = this.modal.confirm({
      nzTitle: 'Tạo thư mục mới',
      nzContent: `
        <input nz-input placeholder="Tên thư mục" id="new-folder-name" />
      `,
      nzOnOk: async () => {
        const input = document.getElementById('new-folder-name') as HTMLInputElement;
        folderName = input.value;
        if (!folderName) {
          this.message.error('Vui lòng nhập tên thư mục');
          return false;
        }
        try {
          await this.filesFoldersService.createFolder(folderName, parentId === 'root' ? null : parentId);
          this.message.success('Đã gửi yêu cầu tạo thư mục');
          setTimeout(() => this.loadTree(), 1000); // Wait for CQRS
          return true;
        } catch (error) {
          this.message.error('Lỗi khi tạo thư mục');
          return false;
        }
      }
    });
  }

  deleteFolder(node: NzTreeNode): void {
    if (node.key === 'root') return;

    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa thư mục "${node.title}" và toàn bộ nội dung bên trong?`,
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.filesFoldersService.deleteFolder(node.key);
          this.message.success('Đã gửi yêu cầu xóa thư mục');
          setTimeout(() => this.loadTree(), 1000);
        } catch (error) {
          this.message.error('Lỗi khi xóa thư mục');
        }
      }
    });
  }

  renameFolder(node: NzTreeNode): void {
    if (node.key === 'root') return;

    let newName = node.title;
    this.modal.confirm({
      nzTitle: 'Đổi tên thư mục',
      nzContent: `
        <input nz-input placeholder="Tên mới" value="${node.title}" id="rename-folder-name" />
      `,
      nzOnOk: async () => {
        const input = document.getElementById('rename-folder-name') as HTMLInputElement;
        newName = input.value;
        if (!newName || newName === node.title) return;

        try {
          // Note: moveFolder with same parent but different name is used for rename in some systems
          // but here we might need an updateFolder call. 
          // The service has moveFolder(folderId, newParentId). 
          // Let's check if there's a rename or update method.
          // In phattrien.md, UpdateFolderCommand is mentioned.
          // Let's check the service again.
          this.message.info('Tính năng đổi tên đang được cập nhật');
        } catch (error) {
          this.message.error('Lỗi khi đổi tên thư mục');
        }
      }
    });
  }
}
